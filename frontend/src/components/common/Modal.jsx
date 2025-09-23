import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl max-w-md w-full m-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;