const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const router = express.Router();



router.get("/register",(req,res)=>{
   res.render("signup");
});

router.post("/register", (req,res)=>{
    const {username,password,email,option} = req.body;
    if(option==="vendor"){
      Vendor.findOne({email:email})
      .then((res)=>{
        if(res){
             res.status(200).json({message:"User email already exists"});
        }
        else {
            Vendor.insertOne({username:username,email:email,password}).then((res)=>{
                res.status(200).json({message:"User Added Successfully"});
            })
            .catch((err)=>{
                res.status(400).json({message:"User Not Added to Database"});
            })
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else {
    return   res.status(200).json({message:"User is ShopOwner"});  

    }
    res.redirect("/selections");
})
router.get("/login",(req,res)=>{
    res.render("login");
})
.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user1 = await Vendor.findOne({email});
    if(user1){
           if(password === user1.password){
            // tokens must be generated 
                res.status(200).json({message:"loggedIn"});
                res.redirect("/");
           }
           else {
            res.status(400).json({message:"Invalid Credentials"});
           }
    }
    else {
        const user2 = await shopOwner.findOne({email});
        if(user2){
            if(password === user2.password){
                // tokens must be generated
                res.status(200).json({message:"loggedIn as ShopOwner"});
                res.redirect("/");
            }
            else {
             res.status(400).json({message:"Invalid Credentials"});
            }
     
        }
        else {
            res.status(400).json({message:"No User Exists"});
        }
    }
   
});

router.get("/forgotPassword",(req,res)=>{
    res.render("forgot");
})
.post("/forgotPassword",(req,res)=>{

});




module.exports = router;