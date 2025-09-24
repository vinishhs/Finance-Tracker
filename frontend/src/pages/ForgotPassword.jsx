import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../services/auth';
import VerificationCodeForm from '../components/Auth/VerificationCodeForm';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code, 3: Success
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await forgotPassword(email);
      setStep(2);
      setSuccess('Password reset code sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (code) => {
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await resetPassword(email, code, newPassword);
      setStep(3);
      setSuccess('Password reset successfully!');
    } catch (err) {
      setError(err.message || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    
    try {
      await forgotPassword(email);
      setSuccess('Reset code sent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-4">Password Reset!</h2>
            <p className="text-gray-400 mb-6">{success}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {step === 1 ? 'Reset Password' : 'Enter Verification Code'}
          </h2>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending Code...' : 'Send Reset Code'}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>

              <VerificationCodeForm
                email={email}
                onVerify={handleResetPassword}
                onResend={handleResendCode}
                isLoading={isLoading}
                type="password"
              />

              <div className="text-center mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-primary hover:underline"
                >
                  Change Email
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;