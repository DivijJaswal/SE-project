const mongoose = require("mongoose");
const Medicine = require("../schemas/medicineShop.js");
const Vendor = require("../schemas/vendor.js");
const ReorderLists = require("../schemas/ReorderList.js");
const medicineShop = require("../schemas/medicineShop.js");
const Sale = require("../schemas/sales.js");
const dotenv = require('dotenv');
const vendorStore = require("../schemas/vendorStore.js");
const Order = require("../schemas/Order.js");
dotenv.config();
const threshold = process.env.MEDICINE_THRESHOLD;
const query = async (req,res) =>{
    const {medicine} = req.body;
    const medicines = await Medicine.findOne({name:medicine,shopOwnerId:req.user._id});
    if(medicines){
       const med = {medicine:medicines};
       const data = JSON.stringify(med);
       return res.redirect("/operations/query/"+data);
       
    }
    else {
        const error = {message:"No such medicine exists in shop"};
       res.redirect("/error/"+JSON.stringify(error));
    }
}

const order = async (req,res)=>{
    const {name,email,stock,price} = req.body;
    
    console.log(req.body);
    const {_id} = req.user._id;
    if(stock <= 0){
        const error = {message:"Quantity should be greater than zero"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const vendor =await Vendor.findOne({email});
    console.log(vendor);
    if(!vendor){
        const error = {message:"No vendor Exists"};
       return res.redirect("/error/"+JSON.stringify(error));
    }
    const med = await vendorStore.findOne({name,vendorId:vendor._id});
    if(!med){
        const error = {message:"Vendor does not have this medicine"};
        return res.redirect("/error/"+JSON.stringify(error));
    }
    if(med.stock<stock){
        const error = {message:"Vendor does not have that much quantity"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const new_order = new Order({name,vendorId:vendor._id,shopId:_id,stock});
    await new_order.save();
    res.redirect("/operations");
   
    
}

const medicine = async (req,res)=>{
    const {name,email} = req.body;
    console.log(req.body);
    const vendor = Vendor.findOne({email});
    if(!vendor){
        const error = {message:"Vendor does not exists"};
       return res.redirect("/error/"+JSON.stringify(error));
    }
    const med1 = await medicineShop.findOne({name,vendorId:vendor._id,shopOwnerId:req.user._id});
    if(med1){
        res.redirect("/operations");
    }
    const med = new medicineShop({name,shopOwnerId:req.user._id,vendorId:vendor._id});
    await med.save();
    res.redirect("/operations");
}

const sales = async (req,res) =>{
      const {customer_name,name,quantity,price} = req.body;
      console.log(req.body);
      const shopId = req.user._id;
      const med = await medicineShop.findOne({shopOwnerId:shopId,name});
      if(!med){
        const error = {message:"This medicine is not sold in this shop"};
        return res.redirect("/error/"+JSON.stringify(error));
      }
      else if(med.stock<quantity){
        const error = {message:"Less quantity avaliable in shop"};
        return res.redirect("/error/"+JSON.stringify(error));
      }
      else {
        const new_sale = new Sale({customer_name,name,stock:quantity,price,shopId});
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
const getOrdersSales = (req,res,next)=>{
    const id = req.user._id;
    const orders = Order.find({shopId:id});
    const sales = Sale.find({shopId:id});
    var ordersCost = 0;
    var salesCost =0;
    orders.map((order)=>{
           if(order.accept)ordersCost+=(order.price*order.cost);
    });
    sales.map((sale)=>{
           salesCost+=sale.price*sale.cost;
    })
    const data = {
        orders,sales,ordersCost,salesCost
    };
    req.data = data;
    next();

}
module.exports = {query,order,medicine,sales,getOrdersSales};