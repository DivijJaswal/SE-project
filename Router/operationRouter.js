const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const Medicine = require("../schemas/medicineShop.js");
const path = require("path");
const medicine = require("../schemas/medicine.js");
const medicineShop = require("../schemas/medicineShop.js");
const Order = require("../schemas/Order.js");
const router = express.Router();



router
.get("/medicine",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'medicine');
    res.render(location);
})
.post("/medicine",async (req,res)=>{
    const {medicine_name,vendor_email,price,generic_name} = req.body;
    const vendor = Vendor.findOne({email:vendor_email});
    if(!vendor){
        const error = {message:"Vendor does not exists"};
        res.redirect("/error/"+JSON.stringify(error));
    }
    const med1 = await medicineShop.findOne({name:medicine_name,vendorId:vendor._id,shopOwnerId:req.user._id});
    if(med1){
        med1.price = price;
        await med1.save();
        res.redirect("/operations");
    }
    const med = new medicineShop({name:medicine_name,shopOwnerId:req.user._id,generic_name,vendorId:vendor._id,price,stock:0});
    await med.save();
    res.redirect("/operations");
})




router
.get("/order",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'order');
    res.render(location);
})
.post("/order",async (req,res)=>{
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
   
    
})


router
.get("/query",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'query');
    res.render(location);
})
.post("/query",async (req,res)=>{
    const {medicine} = req.body;
    const medicines = await Medicine.findOne({name:medicine,shopOwnerId:req.user._id});
    if(medicines){
       const medicines = {medicines};
       // query something.
    }
    else {
        const error = {message:"No medicine"};
       res.redirect("/error/"+JSON.stringify(error));
    }
})

router
.get("/report",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'report');
    res.render(location);
})

router.get("/",(req,res)=>{
    const location = path.join(__dirname,'..','views','selection');
    res.render(location);
})

module.exports = router;