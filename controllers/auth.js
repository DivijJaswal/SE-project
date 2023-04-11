const mongoose = require("mongoose");
const Vendor = require("../schemas/vendor");
const shopOwner = require("../schemas/shopOwner");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
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

const signUp = async (req, res) => {
    const { username, password, email, option } = req.body;
    if (option == "vendor") {
        const user = await Vendor.findOne({ email });
        if (user) {
            res.status(200).json({ message: "User with this email already Exists" });
        }
        else {
            const vendor = new Vendor({ email, name: username, password });
            await vendor.save();
            const jwt_payload = {_id:user._id,name:username,email,isvendor:true}; 
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
            const user = new shopOwner({ email, name: username, password });
            await user.save();
            const jwt_payload = {_id:user._id,name:username,email,isvendor:false}; 
            const token = jwt.sign(jwt_payload,key);
            res.status(200).cookie('token',token).json({ message: "Account Added",token });
            res.redirect("/operations",{token});
        }

    }
}

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    // forgot Logic will be implemented

}

module.exports = { logIn, signUp, forgotPassword }