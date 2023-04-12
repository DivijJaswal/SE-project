const mongoose = require("mongoose");

const sale = new mongoose.Schema({
  customer_name:{
    type:String,
    require:true
  },
   name:{
    type:String,
    require:true
   },
  shopId:{
    type:mongoose.SchemaTypes.ObjectId,
    require:true
  },
  stock:{
    type:Number,
    require:true
  },
 price:{
    type:Number,
    require:true
 }
});

module.exports = mongoose.model("sales",sale);