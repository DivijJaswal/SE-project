const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const path = require("path");
const router = express.Router();



router
.get("/medicine",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'medicine');
    res.render(location);
})

router
.get("/vendor",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'vendor');
    res.render(location);
})

router
.get("/order",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'order');
    res.render(location);
})


router
.get("/query",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'query');
    res.render(location);
})
.post("/query",(req,res)=>{
    
})

router
.get("/report",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'report');
    res.render(location);
})

module.exports = router;