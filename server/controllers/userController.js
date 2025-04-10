const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
exports.registerUser = async (req, res) => {
  try {
    console.log('Registration attempt with:', req.body);
    const {
      firstName,
      lastName,
      email,
      password,
      countryCode,
      mobileNumber,
      sameForWhatsApp,
      whatsAppCountryCode,
      whatsAppNumber
    } = req.body;
    
    // Convert email to lowercase
    const emailLowerCase = email.toLowerCase();
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        msg: 'Please provide all required fields',
        error: 'Missing required fields'
      });
    }
    
    // Check if user already exists (case-insensitive email check)
    console.log('Checking if user exists...');
    let user = await User.findOne({ email: { $regex: new RegExp(`^${emailLowerCase}$`, 'i') } });
    
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    console.log('Creating new user...');
    // Create new user with lowercase email
    user = new User({
      firstName,
      lastName,
      email: emailLowerCase, // Store email in lowercase
      password,
      countryCode: countryCode || '+1',
      mobileNumber,
      sameForWhatsApp: sameForWhatsApp !== undefined ? sameForWhatsApp : true,
      whatsAppCountryCode: whatsAppCountryCode || countryCode || '+1',
      whatsAppNumber: sameForWhatsApp ? mobileNumber : whatsAppNumber
    });
    
    console.log('Hashing password...');
    // Hash password - Ensure password is a string and handle potential errors
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(String(password), salt);
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return res.status(500).json({ msg: 'Error processing password', error: hashError.message });
    }
    
    console.log('Saving user to database...');
    // Save user to database
    try {
      await user.save();
      console.log('User saved successfully');
    } catch (saveErr) {
      console.error('Error saving user:', saveErr);
      return res.status(500).json({ msg: 'Error saving user to database', error: saveErr.message });
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
    
    console.log('Signing JWT token...');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ msg: 'Error creating authentication token' });
        }
        console.log('Registration successful');
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update user type
exports.updateUserType = async (req, res) => {
  try {
    const { userType, ...userTypeDetails } = req.body;
    
    // Find and update the user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        userType,
        userTypeDetails
      },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json({ 
      msg: 'User type updated successfully',
      user
    });
  } catch (err) {
    console.error('Error updating user type:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};