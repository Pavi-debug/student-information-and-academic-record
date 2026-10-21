// components/Layout.jsx
// This is the shell around all protected pages.
// It renders the Sidebar + TopBar + the current page's content via <Outlet />.

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';

function Layout() {
  // Control sidebar open/close on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        {/* <Outlet /> renders the matched child route's component */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay to close sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

export default Layout;
