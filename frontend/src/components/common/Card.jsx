import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`p-6 rounded-2xl bg-surface-dark ${className}`}>
      {children}
    </div>
  );
};

export default Card;