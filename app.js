const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./Router/auth");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/auth",authRouter);
app.use("/", function (req, res) {
  res.status(200).render("home");
});





app.listen(3000, function () {
  console.log("Server started on port 3000");
});
