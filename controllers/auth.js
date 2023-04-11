const mongoose = require("mongoose");
const Vendor = require("../schemas/vendor");
const shopOwner = require("../schemas/shopOwner");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const forgotUser = require("../schemas/forgotSchema");
const signUpUsers = require("../schemas/signUpSchema");
dotenv.config();
const sendEmail = require("./sendEmailForgot");
const key = process.env.JWT_KEY

const logIn = async (req, res) => {
    const { email, password, option } = req.body;
    if (option == "vendor") {
        const user = await Vendor.findOne({ email });
        if (user) {
            if (password === user.password) {
                // tokens must be generated 
                const jwt_payload = {_id:user._id,name:user.name,email,isvendor:true}; 
                const token = jwt.sign(jwt_payload,key);
                res.cookie("token",token);
                res.status(200).json({ message: "loggedIn",token});
                res.redirect("/operations");
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" });
            }
        }
        else {
            res.status(200).json({ message: "Account does not exists" })
        }
    }
    else {
        const user = await shopOwner.findOne({ email });
        if (user) {
            if (password === user.password) {
                // tokens must be generated
                const jwt_payload = {_id:user._id,name:user.name,email,isvendor:false}; 
                const token = jwt.sign(jwt_payload,key);
                res.cookie("token",token);
                res.status(200).json({ message: "loggedIn as ShopOwner" });
                res.redirect("/operations");
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" });
            }
        }

        else {
            res.status(200).json({ message: "Account does not exists" })
        }


    }

}

const signUpForVerification = async (req,res) =>{
    const {username,password,email,option} = req.body;
    const date = new Date();
    const end_Point = sha256(date+email);
    let user = signUpUsers.findOne({email:email,type:option});
    if(!user){
        user = new signUpUsers({email,password,name:username,type:option,end_Point});
    }
    else {
        user.end_Point = end_Point;
    }
    await user.save();
    await sendEmail({subject:"Email Verfication Link",url,email});
    res.redirect("/auth/login");


} 
const signUpComplete = async (req, res) => {
    const { end_Point } = req.body;
    const user = await signUpUsers({end_Point});

    // if no user is signedup
    if(!user){res.redirect("/auth/login");} 

     const {name,email,password,option} = user;
    if (option == "vendor") {
        const user = await Vendor.findOne({ email });
        if (user) {
            res.status(200).json({ message: "User with this email already Exists" });
        }
        else {


            const vendor = new Vendor({ email,  name, password });
            await vendor.save();

            

            const jwt_payload = {_id:user._id,name,email,isvendor:true}; 
            const token = jwt.sign(jwt_payload,key);
            res.status(200).cookie('token',token).json({ message: "Account Added",token});
            res.redirect("/operations",{token});
        }
    }
    else {
        const user = await shopOwner.findOne({ email });
        if (user) {
            res.status(200).json({ message: "User with this email already Exists" });
        }
        else {
            const user = new shopOwner({ email, name, password });
            await user.save();
            const jwt_payload = {_id:user._id,name,email,isvendor:false}; 
            const token = jwt.sign(jwt_payload,key);
            res.status(200).cookie('token',token).json({ message: "Account Added",token });
            res.redirect("/operations",{token});
        }

    }
}

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const option = req.body.option;
    if(option==="vendor"){
    const user = await Vendor.findOne({email:email});
    if(!user){
        res.redirect("/auth/login");
    }
    }
    else {
        const user = await shopOwner.findOne({email:email});
        if(!user){
            res.redirect("/auth/login");
        }
    }
    // forgot password Logic implemented
    const date = new Date();
    const url_endPoint = sha256(date+email);
    const url = base_url + "/auth/verify/forgotPassword/"+url_endPoint;
    const user = forgotUser({email,type:option});
    if(user){
      user.end_Point=url_endPoint;
      await user.save();
    }
    else {
        const new_user = new forgotUser({end_Point:url_endPoint,type:option,email});
        await new_user.save();
    }
    await sendEmail({subject:"Reset Password  Link",email,url});

    // this happens when sent is failed so we will redirect to forgot password page
    res.redirect("/auth/forgotPassword");
    
 
}

const forgotPasswordVerifier = async (req,res) =>{
     
    const user = await forgotUser.findOne({end_Point:req.body.end_Point});
    if(!user){
        res.redirect("/auth/login");
    }
    else {
        const {password} = req.body;
        const email = user.email;
        const option = user.option;
        if(option==="vendor"){
           const user1 = await Vendor.findOne({email:email});
           user1.password = password;
           user1.save();
        }
        else {
            const user1 = await shopOwner.findOne({email:email});
            user1.password = password;
            user1.save();

        }
        res.redirect("/auth/login");

    }

}

module.exports = { logIn, signUpForVerification, forgotPassword,signUpComplete,forgotPasswordVerifier }