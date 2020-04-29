const express = require("express");
const app = express.Router();
let Auth = require("../controller/auth/auth.controller");
app.post("/loginadmin", Auth.LoginAdmin);
module.exports = app;
