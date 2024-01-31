// user.js

const router = require("express").Router();
const User = require("../models/user");

// POST: Create a new user
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT: Update an existing user by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Delete a user by ID
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Get a user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Get count of all users
router.get("/count", async (req, res) => {
    try {
        const count = await User.countDocuments().exec();
        res.status(200).json({ count: count.toString() });
    } catch (err) {
        console.error("Error retrieving user count:", err);
        res.status(500).json({ error: "Error retrieving user count" });
    }
});



module.exports = router;
