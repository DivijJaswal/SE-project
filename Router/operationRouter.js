const express = require("express");
const path = require("path");
const {getOrderList,processOrder,addMedicine} = require("../controllers/vendor.js")
const {query, order,medicine, sales, getOrdersSales} = require("../controllers/shopOwner.js");
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

    const location = path.join(__dirname, '..', 'views', 'queryResult');
    res.render(location,{data: data});
})
.post("/query",verifyshopOwner,query)



router
.get("/report",verifyshopOwner,getOrdersSales,(req,res)=>{
    const location = path.join(__dirname, '..', 'views', 'report');
    res.render(location,req.data);
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
    console.log("hello welcome");
    console.log(req.orders);
    let location = path.join(__dirname,'..','views','error');
    if(!req.orders){
        res.render(location,{message:"No orders Found"});
    }
    let final_orders=[];
     req.orders.map((order)=>{if(order.accept===false){final_orders.push(order);}
})
    if( final_orders.length===0){
        return res.render(location,{message:"No orders Found"});
    }
     location = path.join(__dirname,'..','views','showOrderList');
     res.render(location,{orders:final_orders});
});

// process the order if accept button is clicked
router.get("/vendor/order/accept/:id",(req,res,next)=>{req.orderId = req.params.id;
    //  req.orderId = req.orderId.slice(0,-1);
    next();},verifyVendor,processOrder);


// add medicine to vendor Store
router.get("/vendor/addMed",verifyVendor,(req,res)=>{
    res.render("vendorAddMed");
})
.post("/vendor/addMed",verifyVendor,addMedicine);




module.exports = router;