const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://vass123:vass123@vassinc.mu3zc.mongodb.net/?retryWrites=true&w=majority&appName=vassinc';

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully! 🎉');
    console.log('📊 Database is ready to handle requests 🚀');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('⚠️ Full error:', err);
    console.log('🔴 Database connection failed. Shutting down...');
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;