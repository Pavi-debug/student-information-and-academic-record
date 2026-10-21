// pages/NotFoundPage.jsx
// Shown when the user navigates to a non-existent route.

import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <i className="ph-question" />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="btn btn--primary">
          <i className="ph-house" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
