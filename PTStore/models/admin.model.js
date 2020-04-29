const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    FullName: String,
    Avatar: String,
    Email: String,
    Registration: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Admin", adminSchema);
