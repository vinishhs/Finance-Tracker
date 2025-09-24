import React from 'react';
import { useAuth } from '../services/auth';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* App Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Finance Tracker</h1>
          <p className="text-gray-400">Sign in to manage your expenses</p>
        </div>
        
        {/* Login Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <LoginForm login={login} />
        </div>
        
        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Demo app • Secure authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;