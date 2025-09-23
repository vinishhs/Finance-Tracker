import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Page Not Found</p>
        <Link to="/dashboard" className="text-primary hover:underline">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;