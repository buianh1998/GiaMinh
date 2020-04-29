const express = require("express");
const app = express();
//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, err => {
    if (err) console.log("Cant not connect to PORT");
    console.log("Port connect to successfully");
});
// mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PaintingStore", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log("Error connect to Mongodb");
    console.log("Mongodb connect to successfully");
});
mongoose.set("useFindAndModify", false);

const admin = require("./router/admin.router");
app.use("/admin", admin);
const auth = require("./router/auth.router");
app.use("/auth", auth);
const pageproduct = require("./router/product.router");
app.use("/", pageproduct);
