const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    brandName: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, enum: ['sneaker', 'sneaker care'], required: true },
    size: [{ type: String }], // Assuming size is an array of strings
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
