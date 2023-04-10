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
app.use(express.json());
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

app.use("/auth", authRouter);
app.use("/operations", (req, res) => {
  res.render("selection");
});
app.use("/medicine", (req, res) => {
  res.render("selection");
});
app.use("/", function (req, res) {
  res.status(200).render("home");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
