const mongoose = require("mongoose");
const Order = require("../schemas/Order");
const medicineShop = require("../schemas/medicineShop");
const vendorStore = require("../schemas/vendorStore");
const getOrderList = async (req,res)=>{
    const vendorId = req.user._id;
    const orders = await Order.find({vendorId:vendorId});
    req.orders = orders;
    next();
};
const processOrder = async (req,res) =>{
        const processId = req.params.orderId;
      
            order = await Order.findOne({_id:processId});
            const {name,shopId,vendorId,stock,price} = order;
            const vendorShop = await vendorStore.findOne({name,vendorId});
            const medicineStore = await medicineShop.findOne({name,shopOwnerId:shopId})
            if(!vendorShop || !medicineStore || vendorShop.stock<stock){
                console.log("ERROR");
                // error handling
                return res.json();
            }
            else {
                vendorShop.stock-=stock;
                medicineStore.stock+=stock;
                order.accept=true;
                await vendorShop.save();
                await medicineStore.save();
                await order.save();
                res.redirect("/operations/vendor");
            }
};

const addMedicine  = async (req,res) =>{
    const {name,stock,price} = req.body;
    const vendorId = req.user._id;
    var med =await vendorStore.findOne({name,vendorId});
    if(med){
        med.price = price;
        med.stock+=stock;
    }
    else {
        med = new vendorStore({name,vendorId,stock,price});
    }
    await med.save();
    res.redirect("/operations/vendor");

}
module.exports = {getOrderList,processOrder,addMedicine};