const mongoose = require("mongoose");

const vendorShop = new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
 vendorId:{
    type:mongoose.SchemaTypes.ObjectId,
    require:true
  },
 price:{
    type:Number,
    require:true
 },
 stock:{
    require:true,
    type:Number
 }
});

module.exports = mongoose.model("vendorShops",vendorShop);