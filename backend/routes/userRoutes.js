const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    verifyOTP, 
    resendOTP,
    loginUser,
    getUserProfile
} = require('../controllers/UserControllers');
const { authenticateToken } = require('../middleware/auth');

// Public routes - no authentication required
router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);

// Protected routes - authentication required
router.get('/profile/:id', authenticateToken, getUserProfile);

module.exports = router; 