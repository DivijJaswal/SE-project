const mongoose = require("mongoose");

const Medicine = new mongoose.Schema({
   name:{
    type:String,
    require:true,
    unique:true
   },
  generic_name:{
    type:String,
    require:true
  },
  vendorId:{
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

module.exports = mongoose.model("Medicines",Medicine);