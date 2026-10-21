// components/Spinner.jsx
// A simple CSS loading spinner shown while data is being fetched.

import React from 'react';

function Spinner({ text = 'Loading...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p className="spinner-text">{text}</p>
    </div>
  );
}

export default Spinner;
