const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
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
    },
    type:{
        type:String,
        require:true
    },
    end_Point:{
        type:String,
        require:true
    }
});
module.exports  = new mongoose.model("signUpUsers",signUpSchema); 