const express = require('express');
const connectDB = require('./db'); 
const cors = require('cors'); 
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`✨ Server started on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
});