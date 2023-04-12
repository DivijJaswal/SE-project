const mongoose = require("mongoose");
const Vendor = require("../schemas/vendor");
const shopOwner = require("../schemas/shopOwner");
const ObjectId = mongoose.Types.ObjectId;


const verifyVendor = async (req,res,next) =>{
    const vendor = req.user.email;
    const user = await Vendor.findOne({email:vendor});
    console.log(user);
    if(!user){
        console.log("HELLO");
       res.redirect("/auth/login");
    }
    else {
         next();
    }

}

const verifyshopOwner = async (req,res,next) =>{
    const shopowner = req.user.email;
     user = await shopOwner.findOne({email:shopowner});

    if(!user){
       res.redirect("/auth/login");
    }
    else {
         next();
    }

}
module.exports = {verifyVendor,verifyshopOwner};