const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.JWT_KEY;

const verifyLogins = (req,res,next) =>{
       const authHeader = req.headers.authorization;
       if(!authHeader || !((authHeader.length)>6) || (authHeader.substr(0,6)!="Bearer")){
        next();
       }
       else {
        const token = authHeader.slice(7);
        try{
            const payload = jwt.verify(token,key);
            req.user = payload;
            res.redirect("/operations");
        }
        catch(err){
           next();
        }
       }
}
module.exports = verifyLogins;