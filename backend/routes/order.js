const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Corrected import path
const Cart = require('../models/cart'); // Corrected import path

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

// Create orders from cart items for a specific user
router.post('/create-from-cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ user: userId }).populate('product');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orders = await Promise.all(cartItems.map(async (cartItem) => {
      const { user, product } = cartItem;
      const newOrder = new Order({
        user,
        product: product._id, // Assuming product is a mongoose object
        paymentStatus: 'Pending', // You can set the default payment status here
        deliveryStatus: 'Pending', // You can set the default delivery status here
      });
      await newOrder.save();
      return newOrder;
    }));

    // Remove cart items after creating orders
    await Cart.deleteMany({ user: userId });

    res.status(201).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all orders with populated product and user details
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'product',
      select: 'name brandName price img' // Add fields from the Product model you want to include
    }).populate({
      path: 'user',
      select: 'username email' // Add fields from the User model you want to include
    });
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

// Update order delivery status by ID (admin functionality)
router.put('/update-delivery-status/:id', async (req, res) => {
  try {
    const { deliveryStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { deliveryStatus },
      { new: true }
    ).populate('product').populate('user');
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
