const express = require("express");
const Vendor = require("../schemas/vendor.js");
const shopOwner = require("../schemas/shopOwner.js");
const {signUp,logIn,forgotPassword} = require("../controllers/auth.js");
const router = express.Router();


// signup Router
router
.get("/register",(req,res)=>{res.render("signup");})
.post("/register", signUp);

// login Router
router
.get("/login",(req,res)=>{res.render("login");})
.post("/login",logIn);


// Forgot Password
router
.get("/forgotPassword",(req,res)=>{res.render("forgot");})
.post("/forgotPassword",forgotPassword);

module.exports = router;