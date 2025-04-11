const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login user with email or phone number
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
      console.log('Email lookup result:', user ? 'User found' : 'User not found');
    } else {
      // Process as phone number
      // Remove any non-digit characters for consistent lookup
      const cleanPhone = email.replace(/\D/g, '');
      
      console.log('Looking up user by phone number:', cleanPhone);
      
      // DEBUG: First, get ALL users from the database to examine
      const allUsers = await User.find({});
      console.log('Total users in database:', allUsers.length);
      
      // Log all user phone numbers for debugging
      console.log('All mobile numbers in database:');
      allUsers.forEach((u, index) => {
        console.log(`User ${index + 1}: ${u.firstName} ${u.lastName}, Mobile: ${u.mobileNumber}, Country Code: ${u.countryCode}`);
      });
      
      // Try different ways to find the user
      
      // Method 1: Exact match on mobileNumber
      console.log('Trying exact match on mobileNumber...');
      user = await User.findOne({ mobileNumber: cleanPhone });
      console.log('Result of exact match:', user ? 'User found' : 'User not found');
      
      // Method 2: Match with country code + mobile
      if (!user) {
        console.log('Trying match with country code...');
        const usersWithPossiblePhoneMatches = allUsers.filter(u => {
          if (!u.mobileNumber) return false;
          
          // Try different phone combinations
          const userFullPhone = `${u.countryCode || ''}${u.mobileNumber}`.replace(/\D/g, '');
          const userMobileOnly = u.mobileNumber.replace(/\D/g, '');
          
          console.log(`Comparing: Input [${cleanPhone}] with User [${u.firstName}] Mobile [${userMobileOnly}] Full [${userFullPhone}]`);
          
          return userMobileOnly === cleanPhone || userFullPhone === cleanPhone;
        });
        
        console.log('Potential phone matches:', usersWithPossiblePhoneMatches.length);
        if (usersWithPossiblePhoneMatches.length > 0) {
          user = usersWithPossiblePhoneMatches[0];
          console.log('Found match with user:', user.firstName, user.lastName);
        }
      }
      
      // Method 3: Try ending match (for cases where country code is different)
      if (!user) {
        console.log('Trying ending match...');
        const usersWithEndingMatch = allUsers.filter(u => {
          if (!u.mobileNumber) return false;
          const userMobileClean = u.mobileNumber.replace(/\D/g, '');
          const matches = userMobileClean.endsWith(cleanPhone);
          if (matches) {
            console.log(`Found ending match: User [${u.firstName}] Mobile [${u.mobileNumber}]`);
          }
          return matches;
        });
        
        if (usersWithEndingMatch.length > 0) {
          user = usersWithEndingMatch[0];
          console.log('Found ending match with user:', user.firstName, user.lastName);
        }
      }
    }
    
    // If user not found with any method
    if (!user) {
      console.log('User not found after all attempts');
      return res.status(404).json({ 
        msg: isEmail 
          ? 'Account not found. Please sign up.' 
          : 'Phone number not registered. Please sign up or try logging in with email.'
      });
    }
    
    // Compare password
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      console.log('Invalid credentials - password mismatch');
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
    
    console.log('Signing JWT token...');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Token expires in 24 hours
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ msg: 'Error creating authentication token' });
        }
        
        console.log('Login successful for user:', user.firstName, user.lastName);
        res.json({
          token,
          userType: user.userType,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            countryCode: user.countryCode
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