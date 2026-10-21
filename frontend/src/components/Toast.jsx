// components/Toast.jsx
// A simple pop-up notification that auto-dismisses after a few seconds.

import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose }) {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // cleanup timer on unmount
  }, [onClose]);

  const icons = {
    success: 'ph-check-circle',
    error: 'ph-x-circle',
    warning: 'ph-warning-circle',
    info: 'ph-info',
  };

  return (
    <div className={`toast toast--${type}`}>
      <i className={icons[type]} />
      <span>{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss">
        <i className="ph-x" />
      </button>
    </div>
  );
}

export default Toast;
