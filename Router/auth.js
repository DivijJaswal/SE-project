const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const {signUpForVerification,signUpComplete,logIn,forgotPassword,forgotPasswordVerifier} = require("../controllers/auth.js");
const router = express.Router();


// signup Router
router
.get("/register",(req,res)=>{res.render("signup");})
.post("/register", signUpForVerification);

// verify to create account

router.get("/verify/register/:end_Point",(req,res,next)=>{req.body=req.params.end_Point;next();},signUpForVerification)

// login Router
router
.get("/login",(req,res)=>{res.render("login");})
.post("/login",logIn);


// Forgot Password generate reset link
router
.get("/forgotPassword",(req,res)=>{res.render("forgot");})
.post("/forgotPassword",forgotPassword);

// Forgot Passwork link verification

router.
get("/verify/forgotPassword/:end_Point",(req,res)=>{
    res.render("forgotPasswordPage");
})
post("/verify/forgotPassword/:end_Point",(req,res,next)=>{req.body=req.params.end_Point;next();},forgotPasswordVerifier);


module.exports = router;