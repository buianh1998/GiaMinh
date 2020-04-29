const Admin = require("../../models/admin.model");

module.exports.getAdmin = async (req, res, next) => {
    try {
        let admin = await Admin.find();
        res.json({ kq: true, result: admin });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.getAdminid = async (req, res, next) => {
    try {
        let dataAdmin = await Admin.findById(req.params.idAdmin);
        res.json({ result: true, dataAdmin: dataAdmin });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.newAdmin = async (req, res, next) => {
    try {
        let { Username, Password, FullName, Avatar, Email } = req.body;
        dataAdmin = await Admin.findOne({ $or: [{ Username: req.body.Username }, { Email: req.body.Email }] });
        if (!dataAdmin) {
            let admin = new Admin({
                Username,
                Password,
                FullName,
                Avatar,
                Email
            });
            admin.save((err, data) => {
                if (err) res.json({ kq: false, errMgs: err });
                res.json({ kq: true, result: data });
            });
        } else res.json({ kq: false, errMgs: "Username hoặc Email đã tồn tại" });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.editAdmin = async (req, res, next) => {
    try {
        let { Username, Password, FullName, Avatar, Email } = req.body;
        dataAdmin = await Admin.findOne({ $or: [{ Username: req.body.Username }, { Email: req.body.Email }] });
        if (!dataAdmin) {
            let admin = {
                Username,
                Password,
                FullName,
                Avatar,
                Email
            };

            let Adminn = await Admin.findByIdAndUpdate({ _id: req.params.idAdmin }, admin);
            res.json({ kq: true, result: "Edit successfully" });
        } else {
            res.json({ kq: true, result: "Tk Hoặc Email đã tồn tại" });
        }
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
module.exports.deleteAdmin = async (req, res, next) => {
    try {
        let deleteAdmin = await Admin.findByIdAndDelete(req.params.idAdmin);
        res.json({ kq: true, result: deleteAdmin });
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
