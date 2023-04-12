const express = require("express");
const path = require("path");
const {getOrderList,processOrder,addMedicine} = require("../controllers/vendor.js")
const {query, order,medicine, sales} = require("../controllers/shopOwner.js")
const router = express.Router();


// add medicine and vendor relationship
router
.get("/medicine",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'medicine');
    res.render(location);
})
.post("/medicine",medicine)



// query to order the stock manually
router
.get("/order",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'order');
    res.render(location);
})
.post("/order",order)

// query to know the stock of medicine in shop
router
.get("/query",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'query');
    res.render(location);
})
.get("/query/:data",(req,res)=>{

    const location = path.join(__dirname, '..', 'views', 'query');
    const data = req.params.data;
    res.render(location,data);
})
.post("/query",query)

router
.get("/report",(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'report');
    res.render(location);
})

// selling of medicines to customers
router.get("/sales",sales);

// show operations to shop Owner
router.get("/",(req,res)=>{
    const location = path.join(__dirname,'..','views','selection');
    res.render(location);
})


// show operations to Vendor
router.get("/vendor",(req,res)=>{
    res.render("vendor");
})

// show orderLists which has to be approved 
router.get("/vendor/orderlist",getOrderList,(req,res)=>{
    res.render("showOrderList",{orders:req.orders});
});

// process the order if accept button is clicked
router.get("/vendor/order/accept/:orderId",processOrder);


// add medicine to vendor Store
router.get("/vendor/addMed",(req,res)=>{
    res.render("vendorAddMed");
})
.post("/vendor/addMed",addMedicine);




module.exports = router;