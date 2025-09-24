import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onFailure, isLoading, buttonText = "Continue with Google" }) => {
  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        useOneTap={false}
        shape="rectangular"
        size="large"
        text={buttonText.toLowerCase().includes('sign up') ? 'signup_with' : 'signin_with'}
        disabled={isLoading}
        theme="filled_blue"
        width="100%"
      />
      
      {/* Fallback for if Google button doesn't load */}
      <div className="mt-2 text-center">
        {isLoading && (
          <div className="text-gray-500 text-sm">Connecting to Google...</div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginButton;