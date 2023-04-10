const mongoose = require("mongoose");

const Vendor = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
});
module.exports  = new mongoose.model("Vendors",Vendor); 