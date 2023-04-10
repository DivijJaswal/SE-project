const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    console.log("HELLO");
    res.render("home");
})
router.get("/register",(req,res)=>{
   res.render("signup");
})
.post("/register",(req,res)=>{
      

    res.redirect("/");
})
router.get("/login",(req,res)=>{
    res.render("login");
})
.post("/login",(req,res)=>{

})




module.exports = router;