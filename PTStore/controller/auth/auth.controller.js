const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");
let secret = "HS256*njanfkjnkjda";
module.exports.LoginAdmin = async (req, res, next) => {
    try {
        let errorloginadmin = {};
        let { Username, Password } = req.body;
        let admin = await Admin.findOne({ Username: Username });
        if (!admin) {
            errorloginadmin.username = "Thông tin đăng nhập không chính xác";
            res.json({ kq: false, result: errorloginadmin });
        } else {
            if (Password != admin.Password) {
                errorloginadmin.password = "Mật khẩu không chính xác";
                res.json({ kq: false, result: errorloginadmin });
            } else {
                jwt.sign(
                    {
                        foo: admin
                    },
                    secret,
                    { expiresIn: "1h" },
                    (err, data) => {
                        if (err) {
                            res.json({ kq: false, errMgs: err });
                        }
                        res.json({ kq: true, result: data });
                    }
                );
            }
        }
    } catch (error) {
        res.json({ kq: false, errMgs: error });
    }
};
