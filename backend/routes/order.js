const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Corrected import path

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { user, product } = req.body;
    const newOrder = new Order({ user, product });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('product');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update order by ID
router.put('/:id', async (req, res) => {
  try {
    const { user, product, paymentStatus, deliveryStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { user, product, paymentStatus, deliveryStatus },
      { new: true }
    ).populate('product');
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
