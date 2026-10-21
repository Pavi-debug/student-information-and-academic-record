// pages/LoginPage.jsx
// Admin login form. On success, stores the JWT token and redirects to dashboard.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api.js';

function LoginPage() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Update form state as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // clear error when user starts typing
  };

  // Frontend validation
  const validate = () => {
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.password) return 'Password is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(formData);
      const { token, admin } = response.data;

      // Save token and admin info to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">
            <i className="ph-graduation-cap" />
          </div>
          <h1>EduManage</h1>
          <p>Student Management System</p>
        </div>
        <div className="login-illustration">
          <i className="ph-users-three" />
        </div>
        <div className="login-features">
          <div className="login-feature">
            <i className="ph-check-circle" />
            <span>Manage student records efficiently</span>
          </div>
          <div className="login-feature">
            <i className="ph-check-circle" />
            <span>Track departments and enrollment</span>
          </div>
          <div className="login-feature">
            <i className="ph-check-circle" />
            <span>Secure admin access with JWT</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your admin account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="form-error-banner">
                <i className="ph-x-circle" />
                {error}
              </div>
            )}

            {/* Username field */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-wrapper">
                <i className="ph-user input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-input"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <i className="ph-lock input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={showPassword ? 'ph-eye-slash' : 'ph-eye'} />
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Signing In...
                </>
              ) : (
                <>
                  <i className="ph-sign-in" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="login-footer">
            Student Management System &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
