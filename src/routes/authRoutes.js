const express = require('express');
const { registerUser, loginUser, forgotPassword, changePassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); 
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);


module.exports = router;
