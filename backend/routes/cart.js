const router = require("express").Router();
const Cart = require("../models/cart");

// POST: Add a product to the cart
router.post("/", async (req, res) => {
    const { user, product, quantity } = req.body;

    // Set default quantity to 1 if not provided
    const defaultQuantity = quantity || 1;

    try {
        const newCartEntry = new Cart({
            user,
            product,
            quantity: defaultQuantity
        });
        const savedCartEntry = await newCartEntry.save();
        res.status(201).json(savedCartEntry);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Get all cart entries
router.get("/", async (req, res) => {
    try {
        const cartEntries = await Cart.find();
        res.status(200).json(cartEntries);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Remove a product from the cart
router.delete("/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart entry deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT: Update a cart entry (e.g., change quantity)
router.put("/:id", async (req, res) => {
    try {
        const updatedCartEntry = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCartEntry);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Get cart entries by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const cartEntries = await Cart.find({ user: req.params.userId });
        res.status(200).json(cartEntries);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
