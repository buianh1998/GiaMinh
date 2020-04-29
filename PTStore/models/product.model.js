const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    Title: String,
    Price: Number,
    Description: String,
    Amount: Number,
    Image: String,
    DayAdded: { type: Date, default: Date.now },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: "categori" }
});
productSchema.pre(/^find/, function(next) {
    this.populate({ path: "idCate", select: "Title" });
    next();
});
module.exports = mongoose.model("Product", productSchema);
