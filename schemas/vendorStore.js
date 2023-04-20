const mongoose = require("mongoose");

const vendorShop = new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
 vendorId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"vendors",
    require:true
  },
 price:{
    type:Number,
    require:true
 },
 stock:{
    type:Number,
    require:true
 }
});

module.exports = mongoose.model("vendorShops",vendorShop);