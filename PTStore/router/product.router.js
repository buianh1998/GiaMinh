const exxpress = require("express");
const app = exxpress.Router();
let productPage = require("../controller/product/pageproduct.controller");
app.get("/home", productPage.Home);
app.get("/product", productPage.Product);
app.get("/productofcategori/:idCate", productPage.productofCategori);

module.exports = app;
