const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Make sure the login function exists
const login = authController.login || 
  ((req, res) => res.status(500).json({ msg: 'Login function not implemented' }));

// Make sure the getCurrentUser function exists
const getCurrentUser = authController.getCurrentUser || 
  ((req, res) => res.status(500).json({ msg: 'Get current user function not implemented' }));

// Define routes with fallbacks
router.post('/login', login);
router.get('/me', 
  typeof auth === 'function' ? auth : (req, res, next) => next(), 
  getCurrentUser
);

module.exports = router;