const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateVerificationCode } = require('../utils/emailService');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');
const { verifyGoogleToken } = require('../utils/googleAuth');

// ✅ Signup with email verification
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const userExists = await User.findOne({ email: lowerEmail });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const verificationCode = generateVerificationCode();

    const user = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      isVerified: false,
      verificationCode,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode, name);

    res.status(201).json({ 
      msg: 'Signup successful. Please check your email for verification code.',
      email: lowerEmail 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Google Signup/Login
exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const googleUser = await verifyGoogleToken(token);
    if (!googleUser) {
      return res.status(400).json({ msg: 'Invalid Google token' });
    }

    let user = await User.findOne({ email: googleUser.email.toLowerCase() });

    if (user) {
      // User exists, check if they have Google ID
      if (!user.googleId) {
        user.googleId = googleUser.sub;
        await user.save();
      }
    } else {
      // Create new user with Google auth
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        googleId: googleUser.sub,
        isVerified: true, // Google emails are verified
        avatar: googleUser.picture
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      token: jwtToken,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ msg: 'Google authentication failed' });
  }
};

// ✅ Verify email endpoint
exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await User.findOne({
      email: lowerEmail,
      verificationCode: code,
      verificationExpires: { $gt: Date.now() }, // still valid
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired code' });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    // Generate token after verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({ 
      msg: 'Email verified successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Resend verification code
exports.resendVerification = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: lowerEmail });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    if (user.isVerified) return res.status(400).json({ msg: 'Email already verified' });

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await sendVerificationEmail(email, verificationCode, user.name);

    res.json({ msg: 'Verification code sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Forgot password - send reset code
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ msg: 'If the email exists, a reset code will be sent' });
    }

    const resetCode = generateVerificationCode();
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetCode, user.name);

    res.json({ msg: 'Password reset code sent to your email', email: lowerEmail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Reset password with code
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await User.findOne({
      email: lowerEmail,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired reset code' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Login with verification check
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: lowerEmail });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ 
        msg: 'Please verify your email before logging in',
        needsVerification: true,
        email: user.email
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Logout (same as before)
exports.logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};