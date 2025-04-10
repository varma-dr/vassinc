const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login user
exports.login = async (req, res) => {
  try {
    console.log('Login attempt with:', req.body);
    const { email, phone, password, identifier } = req.body;
    
    // Determine which identifier to use (support both new and old formats)
    let searchEmail = email;
    let searchPhone = phone;
    
    // If identifier is provided (new format), use it appropriately
    if (identifier) {
      if (identifier.includes('@')) {
        searchEmail = identifier;
      } else {
        searchPhone = identifier;
      }
    }
    
    // Validate input
    if ((!searchEmail && !searchPhone) || !password) {
      return res.status(400).json({ msg: 'Please provide email/phone and password' });
    }

    let user;
    
    // Try to find user by email first if available
    if (searchEmail) {
      // Convert email to lowercase
      const emailLowerCase = searchEmail.toLowerCase();
      
      // Check if user exists (case-insensitive email check)
      user = await User.findOne({ email: { $regex: new RegExp(`^${emailLowerCase}$`, 'i') } });
    }
    
    // If no user found by email and phone is available, try phone
    if (!user && searchPhone) {
      user = await User.findOne({ phone: searchPhone });
    }
    
    // If user not found with either method
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ msg: 'Server configuration error' });
    }
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Token expires in 24 hours
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ msg: 'Error creating authentication token' });
        }
        
        console.log('Login successful');
        res.json({
          token,
          userType: user.userType,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
          }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get current user error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};