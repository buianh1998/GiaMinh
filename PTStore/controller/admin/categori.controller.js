const Categori = require("../../models/categori.model");

module.exports.getCategori = async (req, res, next) => {
    try {
        let dataCate = await Categori.find();
        res.json({ result: true, dataCate: dataCate });
    } catch (error) {
        next(error);
    }
};
module.exports.getIdCate = async (req, res, next) => {
    try {
        let dataCate = await Categori.findById(req.params.idCate);
        res.json({ result: true, dataCate: dataCate });
    } catch (error) {
        next(error);
    }
};
module.exports.newCategori = async (req, res, next) => {
    // let { Title } = req.body;
    // Categori.findOne({ Title: Title }, (err, data) => {
    //     if (data || err) {
    //         res.json({ kq: 1, result: "Tên đã tồn tại" });
    //     } else {
    //         let newCate = new Categori({
    //             Title
    //         });
    //         newCate.save((err, data1) => {
    //             if (err) return res.json({ kq: false, errMgs: err });
    //             return res.json({ kq: true, result: data1 });
    //         });
    //     }
    // });
    try {
        let { Title } = req.body;
        let dataCate = await Categori.findOne({ Title: req.body.Title });
        if (dataCate) {
            return res.json({ kq: false, errMgs: "Tên trên đã tồn tại" });
        }
        let newCate = new Categori({
            Title
        });
        newCate.save((err, data) => {
            if (err) return res.json({ kq: false, errMgs: err });
            return res.json({ kq: true, result: data });
        });
    } catch (error) {
        return res.json({ kq: false, errMgs: error });
    }
};
module.exports.editCategori = async (req, res, next) => {
    // Categori.findOne({ Title: req.body.Title }, (err, data) => {
    //     if (err) {
    //         res.json({ kq: false, errMgs: err });
    //     } else if (data) {
    //         res.json({ kq: false, errMgs: "Đã tồn tại" });
    //     } else {
    //         Categori.findByIdAndUpdate({ _id: req.params.idCate }, { Title: req.body.Title }, (err1, data1) => {
    //             if (err1) res.json({ kq: false, errMgs: err1 });
    //             else {
    //                 res.json({ kq: true, result: data1 });
    //             }
    //         });
    //     }
    // });
    try {
        let Title = {
            Title: req.body.Title
        };
        let dataCate = await Categori.findOne({ Title: req.body.Title });
        if (dataCate) {
            res.json({ kq: false, errMgs: "Đã tồn tại " });
            return;
        } else {
            let dataCatee = await Categori.findByIdAndUpdate({ _id: req.params.idCate }, { Title: req.body.Title });
            res.json("Edit successfully");
        }
    } catch (error) {
        next(error);
    }
};
module.exports.deleteCategori = async (req, res, next) => {
    try {
        let dataCate = await Categori.findByIdAndDelete(req.params.idCate);
        res.json({ result: true, dataCate: dataCate });
    } catch (error) {
        next(error);
    }
};
