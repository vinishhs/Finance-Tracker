const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  
  // ✅ Google OAuth fields
  googleId: { type: String, sparse: true },
  avatar: { type: String },

  // ✅ Email verification fields
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },   // store 6-digit code for email verification
  verificationExpires: { type: Date },  // expiry time for verification code

  // ✅ Password reset fields
  resetPasswordCode: { type: String },   // store 6-digit code for password reset
  resetPasswordExpires: { type: Date },  // expiry time for reset code

  // ✅ Timestamps
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

// ✅ Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ verificationExpires: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ resetPasswordExpires: 1 }, { expireAfterSeconds: 0 });

// ✅ Virtual for checking if user has password (for Google auth users)
userSchema.virtual('hasPassword').get(function() {
  return !!this.password;
});

// ✅ Method to check if verification code is valid
userSchema.methods.isVerificationCodeValid = function() {
  return this.verificationExpires && this.verificationExpires > Date.now();
};

// ✅ Method to check if reset code is valid
userSchema.methods.isResetCodeValid = function() {
  return this.resetPasswordExpires && this.resetPasswordExpires > Date.now();
};

// ✅ Method to clear verification fields
userSchema.methods.clearVerification = function() {
  this.verificationCode = undefined;
  this.verificationExpires = undefined;
  return this.save();
};

// ✅ Method to clear reset password fields
userSchema.methods.clearResetPassword = function() {
  this.resetPasswordCode = undefined;
  this.resetPasswordExpires = undefined;
  return this.save();
};

// ✅ Pre-save middleware to handle updates
userSchema.pre('save', function(next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = new Date();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);