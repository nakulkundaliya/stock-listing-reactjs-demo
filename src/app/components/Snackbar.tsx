import React, { useState, useEffect } from "react";

const Snackbar = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="bg-gray-900 text-white p-4 rounded-md fixed top-4 right-4 flex justify-between items-center"
      role="alert"
    >
      {message}
      <button className="text-white ml-4" onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Snackbar;
