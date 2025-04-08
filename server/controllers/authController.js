const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('Login attempt with:', req.body);
    const { email, password, userType } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    // If userType is specified, check if it matches (except for 'standard')
    if (userType && user.userType !== 'standard' && user.userType !== userType) {
      console.log('User type mismatch');
      return res.status(400).json({ msg: 'Invalid user type' });
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
            email: user.email
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

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error getting current user:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};