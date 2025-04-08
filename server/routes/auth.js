const express = require('express');
const router = express.Router();
const { login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', login);

router.get('/me', auth, getCurrentUser);

module.exports = router;