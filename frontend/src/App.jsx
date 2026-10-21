// App.jsx
// Root component. Sets up React Router for client-side navigation.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import AddStudentPage from './pages/AddStudentPage.jsx';
import EditStudentPage from './pages/EditStudentPage.jsx';
import StudentDetailPage from './pages/StudentDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Layout wrapper for protected pages
import Layout from './components/Layout.jsx';

// PrivateRoute: only renders children if the user is logged in
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If no token, redirect to login page
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes — wrapped in PrivateRoute + Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* index route = shown at "/" */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/add" element={<AddStudentPage />} />
          <Route path="students/edit/:id" element={<EditStudentPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
