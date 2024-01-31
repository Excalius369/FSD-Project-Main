const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://abhinavms:abhinavms@cluster0.xnw7ryr.mongodb.net/shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('MongoDB Connected Successfully');
});

const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./auth');
app.use('/api/auth', authRoutes);

const userRoute = require("./routes/user"); // Move this line after defining `app`
app.use("/api/user", userRoute);

const productRoute = require("./routes/product"); // Move this line after defining `app`
app.use("/api/products", productRoute);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for serving 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
