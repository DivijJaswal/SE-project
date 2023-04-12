const mongoose = require("mongoose");
const Medicine = require("../schemas/medicineShop.js");
const Vendor = require("../schemas/vendor.js");
const ReorderLists = require("../schemas/ReorderList.js");
const medicineShop = require("../schemas/medicineShop.js");
const Sale = require("../schemas/sales.js");
const dotenv = require('dotenv');
const vendorStore = require("../schemas/vendorStore.js");
dotenv.config();
const threshold = process.env.MEDICINE_THRESHOLD;
const query = async (req,res) =>{
    const {medicine} = req.body;
    const medicines = await Medicine.findOne({name:medicine,shopOwnerId:req.user._id});
    if(medicines){
       const medicines = {medicine:medicines};
       const data = JSON.stringify(medicines);
       res.redirect("/operations/query/"+data);
       
    }
    else {
        const error = {message:"No such medicine exists in shop"};
       res.redirect("/error/"+JSON.stringify(error));
    }
}

const order = async (req,res)=>{
    const {medicine,vendoremail,quantity,price} = req.body;
    const {_id} = req.user._id;
    if(quantity <= 0){
        const error = {message:"Quantity should be greater than zero"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const vendor =await Vendor.findOne({email:vendoremail});
    if(!vendor){
        const error = {message:"No vendor Exists"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const med = await Medicine.findOne({name:medicine,vendorId:vendor._id});
    if(!med){
        const error = {message:"Vendor does not have this medicine"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    if(med.stock<quantity){
        const error = {message:"Vendor does not have that much quantity"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const new_order = await Order({name:medicine,vendorId:vendor._id,shopId:_id,stock:quantity,price});
    await new_order.save();
    res.redirect("/operations");
   
    
}

const medicine = async (req,res)=>{
    const {medicine_name,vendor_email} = req.body;
    const vendor = Vendor.findOne({email:vendor_email});
    if(!vendor){
        const error = {message:"Vendor does not exists"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const med1 = await ReorderLists.findOne({name:medicine_name,vendorId:vendor._id,shopOwnerId:req.user._id});
    if(med1){
        res.redirect("/operations");
    }
    const med = new ReorderLists({name:medicine_name,shopOwnerId:req.user._id,vendorId:vendor._id});
    await med.save();
    res.redirect("/operations");
}

const sales = async (req,res) =>{
      const {customer_name,name,stock,price} = req.body;
      const shopId = req.user._id;
      const med = medicineShop.findOne({shopOwnerId:shopId,name});
      if(!med || med.stock<stock){
          console.log("No Medicine");
      }
      else {
        const new_sale = new Sale({customer_name,name,stock,price,shopId});
        med.stock-=stock;

        await new_sale.save();
        await med.save();
        if(med.stock<threshold){
             await OrderIfThreshold(shopId,name,threshold-med.stock);
        }

        res.redirect("/operations");

      }
}

const sortByCriteria = (a,b)=>{
    if(a.price<b.price){return -1;}
    if(a.price>b.price){return 1;}
    if(a.stock>b.stock){return -1;}
    if(a.stock<b.stock){return 1;}
    return 0;
}
const OrderIfThreshold = async (shopId,name,stock) =>{
            const vendors =await ReorderLists.find({shopId,name});
            var cost_vendors = vendors.map(async (each)=>{
                return await vendorStore.findOne({name,vendorId:each._id});
            });
            await cost_vendors.sort(sortByCriteria);
            const {vendorId,price} = cost_vendors[0];
            const name1 = cost_vendors[0].name;
            var new_order = new Order({name:name1,vendorId,shopId,stock,price});
            await new_order.save();
}
module.exports = {query,order,medicine,sales};