import express from 'express';
import connectDB from './db.js';

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('\n🎉 🚀 MongoDB Connection Successful! 🚀 🎉');
  console.log('✅ Database connection established');
  console.log('✅ Ready to handle API requests');
  console.log('✅ Your backend infrastructure is now ready\n');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Define port
const PORT = process.env.PORT || 5005;

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});