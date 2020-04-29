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

module.exports.testUploadImage = (req, res, next) => {
    upload(req, res, err => {
        let file = req.file;
        if (err) {
            return res.json({ result: false, errUpload: err });
        }
        return res.json({ result: true, fileUpload: file });
    });
};
