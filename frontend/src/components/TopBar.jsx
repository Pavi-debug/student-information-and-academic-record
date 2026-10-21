// components/TopBar.jsx
// Top navigation bar showing page title and admin info.

import React from 'react';
import { useLocation } from 'react-router-dom';

// Map route paths to readable page titles
const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/students': 'All Students',
  '/students/add': 'Add Student',
  '/profile': 'Profile',
};

function TopBar({ onMenuClick }) {
  const location = useLocation();

  // Get admin name from localStorage
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  // Determine page title — handle dynamic routes like /students/:id
  let title = PAGE_TITLES[location.pathname] || 'Student Details';
  if (location.pathname.includes('/edit/')) title = 'Edit Student';

  return (
    <header className="topbar">
      {/* Hamburger menu (mobile only) */}
      <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <i className="ph-list" />
      </button>

      {/* Page title */}
      <h1 className="topbar__title">{title}</h1>

      {/* Admin info */}
      <div className="topbar__right">
        <div className="topbar__admin">
          <div className="topbar__avatar">
            <i className="ph-user" />
          </div>
          <div className="topbar__admin-info">
            <span className="topbar__admin-name">{admin.username || 'Admin'}</span>
            <span className="topbar__admin-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
