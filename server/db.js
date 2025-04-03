const mongoose = require('mongoose');

// Direct MongoDB connection string
const mongoURI = 'mongodb+srv://vass123:vass123@vassinc.mu3zc.mongodb.net/?retryWrites=true&w=majority&appName=vassinc';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected Successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;