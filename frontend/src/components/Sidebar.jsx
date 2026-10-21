// components/Sidebar.jsx
// Left navigation sidebar.

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored token and admin info
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/login');
  };

  // NavLink applies an "active" class automatically when the route matches
  const navItems = [
    { to: '/dashboard', icon: 'ph-squares-four', label: 'Dashboard' },
    { to: '/students', icon: 'ph-students', label: 'Students' },
    { to: '/students/add', icon: 'ph-user-plus', label: 'Add Student' },
    { to: '/profile', icon: 'ph-user-circle', label: 'Profile' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      {/* Logo / Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <i className="ph-graduation-cap" />
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-title">EduManage</span>
          <span className="sidebar__brand-sub">Student System</span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Main Menu</p>
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <i className={icon} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout button at the bottom */}
      <div className="sidebar__footer">
        <button className="sidebar__logout" onClick={handleLogout}>
          <i className="ph-sign-out" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
