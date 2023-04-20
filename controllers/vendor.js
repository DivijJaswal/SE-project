const mongoose = require("mongoose");
const Order = require("../schemas/Order");
const medicineShop = require("../schemas/medicineShop");
const vendorStore = require("../schemas/vendorStore");
const getOrderList = async (req,res,next)=>{
    const vendorId = req.user._id;
    const orders = await Order.find({vendorId:vendorId});
    req.orders = orders;
    next();
};
const processOrder = async (req,res) =>{
        const processId = req.orderId;
        order = await Order.findById(processId);
            const {name,shopId,vendorId,stock,price} = order;
            const vendorShop = await vendorStore.findOne({name,vendorId});
            const medicineStore = await medicineShop.findOne({name,shopOwnerId:shopId});
            if(!vendorShop || !medicineStore || vendorShop.stock<stock){
                // error handling
                const data = JSON.stringify({message:"No stock or no vendor"});
                return res.redirect("/error/"+data);
            }
            else {
                vendorShop.stock-=stock;
                medicineStore.stock+=stock;
                order.accept=true;
                await vendorShop.save();
                await medicineStore.save();
                await order.save();
                res.redirect("/operations/vendor/orderlist");
            }
};

const addMedicine  = async (req,res) =>{
    const {name,stock,price} = req.body;
    console.log(req.body);
    const vendorId = req.user._id;
    var med =await vendorStore.findOne({name,vendorId});
    if(med){
        med.price = price;
        med.stock+=stock;
    }
    else {
        med = new vendorStore({name,vendorId,stock,price});
    }
    console.log(med);
    console.log("HELLO");
    await med.save();
    res.redirect("/operations/vendor");

}
module.exports = {getOrderList,processOrder,addMedicine};