const express = require('express');
const { 
  signup, 
  login, 
  logout, 
  verifyEmail, 
  googleAuth,
  resendVerification,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Public authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/google-auth', googleAuth); // Google OAuth login/signup

// ✅ Email verification routes
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// ✅ Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// ✅ Protected routes (require authentication)
router.post('/logout', protect, logout);

module.exports = router;