// pages/ProfilePage.jsx
// Shows the currently logged-in admin's profile.

import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Avatar */}
        <div className="profile-avatar">
          <i className="ph-user" />
        </div>

        {/* Info */}
        <h2 className="profile-name">{admin.username || 'Admin'}</h2>
        <span className="profile-role">
          <i className="ph-shield-check" />
          Administrator
        </span>

        {/* Details */}
        <div className="profile-details">
          <div className="profile-detail">
            <span className="profile-detail__label">Username</span>
            <span className="profile-detail__value">{admin.username || '—'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail__label">Role</span>
            <span className="profile-detail__value">{admin.role || 'admin'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail__label">Access Level</span>
            <span className="profile-detail__value">Full Access</span>
          </div>
        </div>

        <button className="btn btn--danger" onClick={handleLogout}>
          <i className="ph-sign-out" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
