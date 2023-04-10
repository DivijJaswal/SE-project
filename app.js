const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

});

app.post("/", function (req, res) {
 
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
