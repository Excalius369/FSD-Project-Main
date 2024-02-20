// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'Pending'
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Processed', 'Dispatched', 'Delivered'], // Allowable values for delivery status
    default: 'Pending'
  }
}, { timestamps: true });

// Populate product field to get product details
orderSchema.pre(/^find/, function(next) {
  this.populate('product');
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
