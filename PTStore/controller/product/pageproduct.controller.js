const Product = require("../../models/product.model");
const Categori = require("../../models/categori.model");

module.exports.Home = async (req, res, next) => {
    try {
        let dataProduct = await Product.find()
            .sort({ DayAdded: -1 })
            .limit(8)
            .skip(0);

        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        res.json({ result: false, errMgs: error });
    }
};

module.exports.Product = async (req, res, next) => {
    try {
        let dataProduct = await Product.find().sort({ DayAdded: -1 });
        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        res.json({ result: false, errMgs: error });
    }
};
module.exports.productofCategori = async (req, res, next) => {
    try {
        let dataProduct = await Product.find({ idCate: req.params.idCate }).sort({ DayAdded: -1 });
        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        res.json({ result: false, errMgs: error });
    }
};
