const express = require('express');
const router = express.Router();
const { registerUser, updateUserType } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/', registerUser);
router.post('/update-type', auth, updateUserType);

module.exports = router;