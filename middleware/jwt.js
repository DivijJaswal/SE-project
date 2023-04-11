const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.JWT_KEY;

const jwtVerify = (req,res,next) =>{
       const authHeader = req.headers.authorization;
       console.log(req.headers);
       console.log(req);
       console.log(authHeader);
       if(!authHeader || !((authHeader.length)>6) || (authHeader.substr(0,6)!="Bearer")){
         res.redirect('/auth/login');
       }
       else {
        const token = authHeader.slice(7);
        try{
            const payload = jwt.verify(token,key);
            console.log(payload);
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