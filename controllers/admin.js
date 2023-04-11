const mongoose = require("mongoose");
const Vendors = require("../schemas/vendor");
const shopOwner = require("../schemas/shopOwner");

const getAllVendors = async (req,res) =>{
       const users = await Vendors.find({});
       const user = await Vendors.findOne({email:"abhiqqlash@gmail.com"});
       console.log(user);
       res.status(200).json({users});
}
const getAllshopOwners  = async (req,res) =>{
    const users = await shopOwner.find({});
    res.status(200).json({users});
}

const removeVendor = async (req,res) =>{
       const {email} = req.body;
       const user = await Vendors.find({email});
       if(!user){
           res.status(200).json({message:"No User"});
       }
       else {
        await user.delete();
        res.status(200).json({message:"Deleted"});
       }
}

const removeshopOwner = async (req,res) =>{
    const {email} = req.body;
    const user = await shopOwner.find({email});
    if(!user){
        res.status(200).json({message:"No User"});
    }
    else {
     await user.delete();
     res.status(200).json({message:"Deleted"});
    }
}
const removeAllVendors = async (req,res) =>{
       await Vendors.deleteMany({});
       res.status(200).json({message:"Deleted All"});
}

const removeAllshopOwners = async (req,res)=>{

    await shopOwner.deleteMany({});
    res.status(200).json({message:"Deleted All"});
}
module.exports= {getAllVendors,getAllshopOwners,removeVendor,removeshopOwner};