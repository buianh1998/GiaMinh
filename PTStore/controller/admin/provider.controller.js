const Provider = require("../../models/provider.model");

module.exports.getProvider = async (req, res, next) => {
    try {
        let provider = await Provider.find();
        res.json({ kq: true, result: provider });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.getProviderid = async (req, res, next) => {
    try {
        let dataProvider = await Provider.findById(req.params.idProvider);
        res.json({ result: true, dataProvider: dataProvider });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.newProvider = async (req, res, next) => {
    try {
        let { Username, Password, FullName, Address, Avatar, Email, BirthDay, PhoneNumber } = req.body;
        let dataProvider = await Provider.findOne({ $or: [{ Username: req.body.Username }, { Email: req.body.Email }] });
        if (!dataProvider) {
            let provider = new Provider({
                Username,
                Password,
                FullName,
                Address,
                Avatar,
                Email,
                BirthDay,
                PhoneNumber,
                Status: false
            });
            provider.save((err, data) => {
                if (err) res.json({ kq: false, errMgs: err });
                res.json({ kq: true, result: data });
            });
        } else {
            res.json({ kq: false, result: "TK hoặc Email đã tồn tại" });
        }
    } catch (error) {
        res.json({ kq: false, result: error });
    }
};
module.exports.editProvider = async (req, res, next) => {
    try {
        let { Username, Password, FullName, Address, Avatar, Email, BirthDay, PhoneNumber } = req.body;
        let provider = {
            Username,
            Password,
            FullName,
            Address,
            Avatar,
            Email,
            BirthDay,
            PhoneNumber
        };
        let dataProvider = await Provider.findOne({ $or: [{ Username: req.body.Username }, { Email: req.body.Email }] });
        if (!dataProvider) {
            let Providerr = await Provider.findByIdAndUpdate({ _id: req.params.idProvider }, provider);
            res.json({ kq: true, result: Providerr });
        } else {
            res.json({ kq: false, result: "TK hoặc Email đã tồn tại" });
        }
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.deleteProvider = async (req, res, next) => {
    try {
        let deleteProvider = await Provider.findByIdAndDelete(req.params.idProvider);
        res.json({ kq: true, result: deleteProvider });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
