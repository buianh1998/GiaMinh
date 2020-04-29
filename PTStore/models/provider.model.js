const mongoose = require("mongoose");
const providerSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    FullName: String,
    Address: String,
    Avatar: String,
    Email: String,
    BirthDay: { type: Date },
    PhoneNumber: String,
    Status: Boolean,
    Registration: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Provider", providerSchema);
