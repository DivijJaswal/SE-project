const mongoose = require("mongoose");

const MedicineShop = new mongoose.Schema({
   name:{
    type:String,
    require:true,
    unique:true
   },
  shopOwnerId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"shopowners",
    require:true
  },
  stock:{
    type:Number,
    require:true,
    default:0
  }
});

module.exports = mongoose.model("MedicineShop",MedicineShop);