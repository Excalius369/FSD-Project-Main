const express = require('express');
const router = express.Router();
const User = require('./models/user');
const bcrypt = require('bcrypt');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the user is an admin
    if (username === 'admin' && password === '789456123') {
      // Redirect admin to admin page
      return res.status(200).json({ success: true, isAdmin: true });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Assuming user has an _id field, include it in the response
      res.status(200).json({ success: true, isAdmin: false, userId: user._id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, address, pincode } = req.body; // Include address and pincode
    if (!username || !email || !password || !address || !pincode) { // Check if any field is missing
      return res.status(400).json({ success: false, message: 'Please fill all the required fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, address, pincode }); // Include address and pincode
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


module.exports = router;
