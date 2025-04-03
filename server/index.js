const express = require('express');
const connectDB = require('./db');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

//  routes
app.get('/', (req, res) => {
  res.send('API is running');
});

//  port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});