import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
