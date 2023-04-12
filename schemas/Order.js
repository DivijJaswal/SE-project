const mongoose = require("mongoose");

const Order = new mongoose.Schema({
   name:{
    type:String,
    require:true,
    unique:true
   },
  vendorId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"vendors",
    require:true
  },
  shopId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"shopowners",
    require:true
  },
  stock:{
    type:Number,
    require:true
  },
  accept:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Orders",Order);