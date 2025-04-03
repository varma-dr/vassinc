const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));