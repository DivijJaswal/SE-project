const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const Medicine = require("../schemas/medicine.js");
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
    if(!vendor){res.redirect("/error",{message:"Vendor does not exists"});}
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
    if(quantity <= 0){res.redirect("/error",{message:"Quantity should be greater than zero"});}
    const vendor =await Vendor.findOne({email:vendoremail});
    if(!vendor){res.redirect("/error",{message:"Vendor does not exists"});}
    const med = await Medicine.findOne({name:medicine,vendorId:vendor._id});
    if(!med){
        res.redirect("/error",{message:"Vendor does not have this medicine"});
    }
    if(med.stock<quantity){
        res.redirect("/error",{message:"Vendor does not have that much quantity"});
    }
    const new_order = await Order({name:medcine,vendorId:vendor._id,shopId:_id,stock:quantity,price});
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
    const medicines = await Medicine.find({name:medicine});
    if(medicines.length>0){
       res.redirect("/operations/reports",{medicines:medicines});
    }
    else {
       res.redirect("/error",{error:"No Medicine"});
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