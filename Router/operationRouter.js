const express = require("express");
const path = require("path");
const {getOrderList,processOrder,addMedicine} = require("../controllers/vendor.js")
const {query, order,medicine, sales} = require("../controllers/shopOwner.js");
const { verifyshopOwner, verifyVendor } = require("../middleware/verifyEntity.js");
const router = express.Router();


// add medicine and vendor relationship
router
.get("/medicine",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'medicine');
    res.render(location);
})
.post("/medicine",verifyshopOwner,medicine)



// query to order the stock manually
router
.get("/order",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'order');
    res.render(location);
})
.post("/order",verifyshopOwner,order)

// query to know the stock of medicine in shop
router
.get("/query",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'query');
    res.render(location);
})
.get("/query/:data",verifyshopOwner,(req,res)=>{

    const location = path.join(__dirname, '..', 'views', 'query');
    const data = req.params.data;
    res.render(location,data);
})
.post("/query",verifyshopOwner,query)

router
.get("/report",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'report');
    res.render(location);
})

// selling of medicines to customers
router
.get("/sales",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'sales');
    res.render(location);
})
.post("/sales",verifyshopOwner,sales);

// show operations to shop Owner
router.get("/",verifyshopOwner,(req,res)=>{
    const location = path.join(__dirname,'..','views','selection');
    res.render(location);
})


// show operations to Vendor
router.get("/vendor",verifyVendor,(req,res)=>{
    const location = path.join(__dirname,'..','views','vendorActions');
    res.render(location);
})

// show orderLists which has to be approved 
router.get("/vendor/orderlist",verifyVendor,getOrderList,(req,res)=>{
    res.render("showOrderList",{orders:req.orders});
});

// process the order if accept button is clicked
router.get("/vendor/order/accept/:orderId",verifyVendor,processOrder);


// add medicine to vendor Store
router.get("/vendor/addMed",verifyVendor,(req,res)=>{
    res.render("vendorAddMed");
})
.post("/vendor/addMed",verifyVendor,addMedicine);




module.exports = router;