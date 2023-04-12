const mongoose = require("mongoose");

const ReorderList = new mongoose.Schema({
   name:{
    type:String,
    require:true,
   },
  vendorId:{
    type:mongoose.SchemaTypes.ObjectId,
    require:true
  },
  shopId:{
    type:mongoose.SchemaTypes.ObjectId,
    require:true
  }
});

module.exports = mongoose.model("ReorderLists",ReorderList);