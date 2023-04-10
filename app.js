const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRouter = require("./Router/auth");
const dotenv = require("dotenv");
dotenv.config();
const mongourl = process.env.MONGO_URL;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// mongoose.connect(mongourl,{
//   useNewUrlParser:true,
//   useUnifiedTopology:true})
//   .then((res)=>{
//     console.log("Connected to database");
//   })
//   .catch((err)=>{

//   });


app.use(express.static("public"));



app.use("/auth",authRouter);
app.use("/operations",(req,res)=>{
  res.render("selection");
})
app.use("/", function (req, res) {
  res.status(200).render("home");
});





app.listen(3000, function () {
  console.log("Server started on port 3000");
});
