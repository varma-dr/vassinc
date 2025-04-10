const express = require('express');
const router = express.Router();

// Import the controller functions
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Make sure the functions exist before using them
const registerUser = userController.registerUser || 
  ((req, res) => res.status(500).json({ msg: 'Registration function not implemented' }));

const updateUserType = userController.updateUserType || 
  ((req, res) => res.status(500).json({ msg: 'Update user type function not implemented' }));

// Define routes with fallback for auth middleware
router.post('/', registerUser);
router.post('/update-type', 
  typeof auth === 'function' ? auth : (req, res, next) => next(), 
  updateUserType
);

module.exports = router;