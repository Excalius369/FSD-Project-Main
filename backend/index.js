const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://abhinavms:abhinavms@cluster0.xnw7ryr.mongodb.net/shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err); // Improved error handling
        process.exit(1);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error:')); // Improved error handling
db.once('open', () => {
    console.log('MongoDB Connected Successfully');
});

const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./auth'); // Assuming 'auth.js' is in the same directory
app.use('/api/auth', authRoutes);

const userRoute = require("./routes/user"); // Corrected path
app.use("/api/user", userRoute);

const productRoute = require("./routes/product"); // Corrected path
app.use("/api/products", productRoute);

const cartRoute = require("./routes/cart"); // Corrected path
app.use("/api/cart", cartRoute);

const orderRoutes = require('./routes/order'); // Corrected path
app.use('/api/orders', orderRoutes);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for serving 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
