import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/api/auth/login', { email, password });
      
      if (res.data.needsVerification) {
        // Redirect to verification page if email is not verified
        navigate('/verify-email', { state: { email: res.data.email } });
        return;
      }

      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.msg || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (googleData) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/api/auth/google-auth', {
        token: googleData.credential
      });
      
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.msg || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Google Login Button */}
      <GoogleLoginButton 
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        isLoading={isLoading}
      />

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-600"></div>
        <div className="px-3 text-gray-400">or</div>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
            Email
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
        
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link 
            to="/forgot-password" 
            className="text-primary hover:underline text-sm"
          >
            Forgot your password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;