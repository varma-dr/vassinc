const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login user
exports.login = async (req, res) => {
  try {
    console.log('Login attempt with:', req.body);
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email/phone and password' });
    }

    let user;
    
    // Check if input is an email or phone by looking for @ symbol
    const isEmail = email && email.includes('@');
    
    if (isEmail) {
      // Process as email
      const emailLowerCase = email.toLowerCase();
      
      // Check if user exists (case-insensitive email check)
      user = await User.findOne({ email: { $regex: new RegExp(`^${emailLowerCase}$`, 'i') } });
      
      // Log the query result
      console.log('Email lookup result:', user ? 'User found' : 'User not found');
    } else {
      // Process as phone number
      // Remove any non-digit characters for consistent lookup
      const cleanPhone = email.replace(/\D/g, '');
      
      console.log('Looking up user by phone:', cleanPhone);
      
      // Try multiple ways to find the user by phone
      // Some systems store with formatting, some without
      const phoneQueries = [
        { phone: cleanPhone },
        { phone: cleanPhone.toString() }
      ];
      
      // Try each query until a user is found
      for (const query of phoneQueries) {
        user = await User.findOne(query);
        if (user) break;
      }
      
      // If still not found, do a more flexible search
      if (!user) {
        // Find all users and check phone numbers
        const allUsers = await User.find({});
        console.log('All users in system:', allUsers.length);
        console.log('Sample of users:', allUsers.slice(0, 3).map(u => ({ 
          id: u._id, 
          email: u.email,
          phone: u.phone || 'No phone',
          phoneType: u.phone ? typeof u.phone : 'N/A'
        })));
        
        // Look for matching phone manually (helps debug issues with data types)
        user = allUsers.find(u => {
          if (!u.phone) return false;
          const userPhone = u.phone.toString().replace(/\D/g, '');
          return userPhone === cleanPhone;
        });
        
        console.log('Manual phone lookup result:', user ? 'User found' : 'User not found');
      } else {
        console.log('Database query found user with phone:', user.phone);
      }
    }
    
    // If user not found with either method
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found. The phone number may not be registered.' });
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