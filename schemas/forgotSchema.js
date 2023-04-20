const mongoose = require("mongoose");

const forgotSchema  = new mongoose.Schema({
     end_Point : {
        type:String,
        require:true,
        unique:true
     }
     ,
     type:{
     type:String,
     require:true
     },
     email:{
        type:String,
        require:true
     }
},
{
   timestamps:true
});
module.exports = mongoose.model("forgotUser",forgotSchema);