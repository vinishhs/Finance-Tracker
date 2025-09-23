import React from 'react';

const Alert = ({ message, type = 'info' }) => {
  const styles = {
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    error: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <div className={`p-4 rounded-lg ${styles[type]}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;