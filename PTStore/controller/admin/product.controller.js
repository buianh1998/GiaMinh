const Product = require("../../models/product.model");
const Categori = require("../../models/categori.model");
const multer = require("multer");

let storageImage = multer.diskStorage({
    destination: (req, file, callback) => {
        let addressFile = "C:/Users/TheAnhPC/Desktop/argon-dashboard-angular-master/argon-dashboard-angular-master/src/assets/img/product";
        callback(null, addressFile);
    },
    filename: (req, file, callback) => {
        let mathFile = ["image/jpg", "image/png", "image/jpeg"];
        if (mathFile.indexOf(file.mimetype) === -1) {
            let errMathFile = "File phải có định dạng là jpg hoặc png";
            return callback(errMathFile, null);
        }
        let fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    }
});
let upload = multer({ storage: storageImage, limits: { fieldSize: 2097152 } }).single("avatar");

module.exports.getProduct = async (req, res, next) => {
    try {
        let dataProduct = await Product.find().sort({ DayAdded: -1 });
        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        res.json({ result: false, errMgs: error });
    }
};
module.exports.getProductid = async (req, res, next) => {
    try {
        let dataProduct = await Product.findById(req.params.idProduct);
        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        next(error);
    }
};
module.exports.newProduct = (req, res, next) => {
    upload(req, res, async errorUpload => {
        if (errorUpload) {
            if (errorUpload.message) {
                return res.json({ result: false, errMgs: "Kích thước của file không được quá 2 MB" });
            }
            return res.json({ result: false, errMgs: "File phải có định dạng là jpg hoặc png" });
        }
        let { Title, Price, Description, Amount, idCate } = req.body;
        let newProduct = new Product({
            Title,
            Price,
            Description,
            Amount,
            Image: typeof req.file !== "undefined" ? req.file.filename : null,
            idCate
        });

        try {
            let dataProduct = await Product.findOne({ Title: req.body.Title });
            if (!dataProduct) {
                newProduct.save((err, data) => {
                    if (err) res.json({ kq: false, errMgs: err });
                    return res.json({ kq: true, dataNewProduct: data });
                });
            } else {
                return res.json({ kq: false, errMgs: "Tên trên đã tồn tại" });
            }
        } catch (error) {
            return res.json({ kq: false, errMgs: `Lỗi từ server : ${error}` });
        }
    });
};
module.exports.editProduct = async (req, res, next) => {
    try {
        let { Title, Price, Description, Amount, Image, idCate } = req.body;
        let editProduct = {
            Title,
            Price,
            Description,
            Amount,
            Image,
            idCate
        };
        let dataProduct = await Product.findOne({ Title: req.body.Title });
        if (!dataProduct.Title) {
            let dataProduct = await Product.findByIdAndUpdate({ _id: req.params.idProduct }, editProduct);
            res.json("Edit successfully");
        } else {
            res.json({ kq: false, errMgs: "Tên trên đã tồn tại" });
        }
    } catch (error) {
        next(error);
    }
};
module.exports.deleteProduct = async (req, res, next) => {
    try {
        let dataProduct = await Product.findByIdAndDelete(req.params.idProduct);
        res.json({ result: true, dataProduct: dataProduct });
    } catch (error) {
        next(error);
    }
};
