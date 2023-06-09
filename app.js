const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./Router/auth");
const dotenv = require("dotenv");
const adminRouter = require("./Router/admin");
const jwtVerify = require("./middleware/jwt");
const verifyLogins = require("./middleware/verifyLogins");
const operationRouter = require("./Router/operationRouter");
const HTO = require("./middleware/homeToOperations");
dotenv.config();
const mongourl = process.env.MONGO_URL;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose.connect(
  mongourl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to database");
  }
);



app.use(express.static("public"));

//authentication router
app.use("/auth",verifyLogins,authRouter);

// operations for users
app.use("/operations",jwtVerify ,operationRouter);

// admin 
app.use("/admin",adminRouter);

// errors
app.use("/error/:error",(req,res)=>{
  var error = req.params.error;
  error = JSON.parse(error);
  console.log(error);
  res.render("error",error);
})

app.use("/logout",(req,res)=>{
  res.clearCookie("Authorization");
  res.redirect("/auth/login");
})

// home page 
app.use("/",HTO,  (req, res) => {
  res.status(200).render("home");
});

// server listening
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
