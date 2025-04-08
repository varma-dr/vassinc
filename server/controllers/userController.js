const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        msg: 'Please provide all required fields',
        error: 'Missing required fields'
      });
    }

    // Check if user already exists
    console.log('Checking if user exists...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    console.log('Creating new user...');
    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
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

// Update user type and related information
exports.updateUserType = async (req, res) => {
  try {
    console.log('Update user type request with:', req.body);
    
    // Get user data from decoded token
    const userId = req.user.id;
    
    const {
      userType,
      // Candidate fields
      visaInfo,
      highestDegree,
      universityName,
      passedOutYear,
      // Recruiter fields
      yearsOfExp,
      pastCompany,
      // Employee fields
      companyName,
      position,
      startDate
    } = req.body;

    // Validate user type
    if (!userType || !['candidate', 'recruiter', 'employee'].includes(userType)) {
      return res.status(400).json({ msg: 'Invalid user type' });
    }

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user type
    user.userType = userType;

    // Update specific fields based on user type
    if (userType === 'candidate') {
      if (!visaInfo || !highestDegree || !universityName || !passedOutYear) {
        return res.status(400).json({ msg: 'Missing required candidate fields' });
      }
      
      user.visaInfo = visaInfo;
      user.highestDegree = highestDegree;
      user.universityName = universityName;
      user.passedOutYear = passedOutYear;
    } 
    else if (userType === 'recruiter') {
      if (!yearsOfExp || !pastCompany || !highestDegree || !universityName || !passedOutYear) {
        return res.status(400).json({ msg: 'Missing required recruiter fields' });
      }
      
      user.yearsOfExp = yearsOfExp;
      user.pastCompany = pastCompany;
      user.highestDegree = highestDegree;
      user.universityName = universityName;
      user.passedOutYear = passedOutYear;
    } 
    else if (userType === 'employee') {
      if (!companyName || !position || !startDate) {
        return res.status(400).json({ msg: 'Missing required employee fields' });
      }
      
      user.companyName = companyName;
      user.position = position;
      user.startDate = startDate;
    }

    // Save updated user
    await user.save();
    console.log('User type updated successfully');

    res.status(200).json({ 
      msg: 'User type updated successfully',
      userType: user.userType
    });
    
  } catch (err) {
    console.error('Error updating user type:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};