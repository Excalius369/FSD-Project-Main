const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://abhinavms:31211@cluster0.xnw7ryr.mongodb.net/shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
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


app.use(express.static('build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up and it is running on port ${port}`);
});