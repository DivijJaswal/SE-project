const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const key = process.env.JWT_KEY;

const logInCheck = (req,res,next)=>{
    console.log(req.user,"hello");
    if(req.user){
        if(req.user.isvendor){
            res.redirect("/operations/vendor");
        }
        else {
            res.redirect("/operations/");
        }
    }

    var authHeader = req.headers.authorization||req.headers.cookie;
    if(!authHeader){next();}

    if(!req.headers.authorization){
     authHeader = authHeader.substr(23,authHeader.length-23);
     authHeader="Bearer "+authHeader;
   }
   console.log(authHeader);
    if(!authHeader || !((authHeader.length)>6) || (authHeader.substr(0,6)!="Bearer")){
      next();
    }
    else {
        const token = authHeader.substr(7,authHeader.length-7);
        try{
            console.log(token);
            var payload = jwt.verify(token,key);
            console.log(payload);
            req.user = payload;
            if(payload.isvendor){
            res.redirect("/operations/vendor");
            }
            else {
                res.redirect("/operations/");
            }
        }
        catch(err){
            next();
        }
       }


}
module.exports = {logInCheck};