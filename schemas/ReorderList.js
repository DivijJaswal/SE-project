const mongoose = require("mongoose");

const ReorderList = new mongoose.Schema({
   name:{
    type:String,
    require:true,
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
  }
},{
  timestamps:true
});

module.exports = mongoose.model("ReorderLists",ReorderList);