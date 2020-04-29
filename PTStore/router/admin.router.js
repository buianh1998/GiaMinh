const express = require("express");
const app = express.Router();
const categori = require("../controller/admin/categori.controller");
const product = require("../controller/admin/product.controller");
const provider = require("../controller/admin/provider.controller");
const admin = require("../controller/admin/admin.controller");
const test = require("../controller/admin/test.controller");

//Categori data
app.get("/getcategori", categori.getCategori);
app.get("/getcategorid/:idCate", categori.getIdCate);
app.post("/newcategori", categori.newCategori);
app.put("/editcategori/:idCate", categori.editCategori);
app.delete("/deletecategori/:idCate", categori.deleteCategori);
//Product data
app.get("/product", product.getProduct);
app.get("/productid/:idProduct", product.getProductid);
app.post("/newproduct", product.newProduct);
app.put("/editproduct/:idProduct", product.editProduct);
app.delete("/deleteproduct/:idProduct", product.deleteProduct);
//Provider data
app.get("/provider", provider.getProvider);
app.get("/providerid/:idProvider", provider.getProviderid);
app.post("/newprovider", provider.newProvider);
app.put("/eidtprovider/:idProvider", provider.editProvider);
app.delete("/deleteprovider/:idProvider", provider.deleteProvider);
//Admin data
app.get("/admin", admin.getAdmin);
app.get("/adminid/:idAdmin", admin.getAdminid);
app.post("/newadmin", admin.newAdmin);
app.put("/eidtadmin/:idAdmin", admin.editAdmin);
app.delete("/deleteadmin/:idAdmin", admin.deleteAdmin);
app.post("/test", test.testUploadImage);
module.exports = app;
