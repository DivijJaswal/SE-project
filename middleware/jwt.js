const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const key = process.env.JWT_KEY;

const jwtVerify = (req,res,next) =>{
       var authHeader = req.headers.authorization||req.headers.cookie;

       if(!authHeader){res.redirect("/auth/login");}

       if(!req.headers.authorization){
        authHeader = authHeader.substr(23,authHeader.length-23);
        authHeader="Bearer "+authHeader;
      }

       if(!authHeader || !((authHeader.length)>6) || (authHeader.substr(0,6)!="Bearer")){
         res.redirect('/auth/login');
       }
       
       else {
        const token = authHeader.substr(7,authHeader.length-7);
  
        try{
            var payload = jwt.verify(token,key);
            console.log(payload);
            payload._id = mongoose.Types.ObjectId(payload._id);
            req.user = payload;
            next();
        }
        catch(err){
            console.log(err);
            res.redirect('/auth/login');
        }
       }
}
module.exports = jwtVerify;