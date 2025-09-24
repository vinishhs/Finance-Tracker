const User = require('../models/User');
const { generateVerificationCode, sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');

/**
 * Resend verification email
 */
exports.resendVerification = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerEmail });
    
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: 'Email is already verified' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationCode, user.name);

    res.json({ 
      msg: 'Verification code sent successfully',
      email: user.email 
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Send password reset email
 */
exports.sendPasswordReset = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerEmail });
    
    // Don't reveal if user exists for security
    if (!user) {
      return res.json({ 
        msg: 'If the email exists, a password reset code will be sent',
        email: lowerEmail 
      });
    }

    // Generate reset code
    const resetCode = generateVerificationCode();
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetCode, user.name);

    res.json({ 
      msg: 'Password reset code sent successfully',
      email: user.email 
    });
  } catch (error) {
    console.error('Password reset email error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Verify password reset code
 */
exports.verifyResetCode = async (req, res) => {
  const { email, code } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const user = await User.findOne({
      email: lowerEmail,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired reset code' });
    }

    res.json({ 
      msg: 'Reset code verified successfully',
      email: user.email 
    });
  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};