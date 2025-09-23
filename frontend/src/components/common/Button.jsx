import React from 'react';

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-bold transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;