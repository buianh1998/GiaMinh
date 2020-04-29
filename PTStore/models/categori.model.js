const mongosee = require("mongoose");

let categoriSchema = new mongosee.Schema({
    Title: String,
    DayAdded: { type: Date, default: Date.now }
});
module.exports = mongosee.model("categori", categoriSchema);
