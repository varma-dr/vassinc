const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', registerUser);

module.exports = router;