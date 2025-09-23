import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-gray-400/10 text-gray-400',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-400/10 text-green-400',
    warning: 'bg-yellow-400/10 text-yellow-400',
    danger: 'bg-red-400/10 text-red-400',
    info: 'bg-blue-400/10 text-blue-400',
    purple: 'bg-purple-400/10 text-purple-400'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;