const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const app = express();

// Load PORT and Mongo URI from .env
const port = process.env.PORT || 3010;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.static('static'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch((err) => {
  console.error("❌ Error connecting to MongoDB:", err.message);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
