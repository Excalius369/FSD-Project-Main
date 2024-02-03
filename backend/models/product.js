const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    brandName: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, enum: ['sneaker', 'sneaker care'], required: true },
    size: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
