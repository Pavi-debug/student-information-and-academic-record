// pages/DashboardPage.jsx
// Main dashboard showing stats, department breakdown, and recent students.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../services/api.js';
import Spinner from '../components/Spinner.jsx';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  // Fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []); // [] means run once on mount

  if (loading) return <Spinner text="Loading dashboard..." />;
  if (error) return <div className="error-state"><i className="ph-warning" />{error}</div>;

  // Color map for department badges
  const deptColors = {
    BCA: '#6366f1', BCS: '#0ea5e9', MCA: '#8b5cf6', BSC: '#10b981',
    MBA: '#f59e0b', BE: '#ef4444', BTech: '#ec4899', Other: '#6b7280',
  };

  return (
    <div className="dashboard">
      {/* Welcome banner */}
      <div className="dashboard__welcome">
        <div>
          <h2>Good {getGreeting()}, {admin.username || 'Admin'} 👋</h2>
          <p>Here's what's happening with your students today.</p>
        </div>
        <Link to="/students/add" className="btn btn--primary">
          <i className="ph-user-plus" />
          Add Student
        </Link>
      </div>

      {/* Stat cards */}
      <div className="stat-cards">
        <div className="stat-card stat-card--blue">
          <div className="stat-card__icon"><i className="ph-users" /></div>
          <div className="stat-card__body">
            <p className="stat-card__label">Total Students</p>
            <h3 className="stat-card__value">{stats.totalStudents}</h3>
          </div>
        </div>

        <div className="stat-card stat-card--purple">
          <div className="stat-card__icon"><i className="ph-buildings" /></div>
          <div className="stat-card__body">
            <p className="stat-card__label">Departments</p>
            <h3 className="stat-card__value">{stats.totalDepartments}</h3>
          </div>
        </div>

        <div className="stat-card stat-card--green">
          <div className="stat-card__icon"><i className="ph-user-plus" /></div>
          <div className="stat-card__body">
            <p className="stat-card__label">Recent Additions</p>
            <h3 className="stat-card__value">{stats.recentStudents.length}</h3>
          </div>
        </div>

        <div className="stat-card stat-card--orange">
          <div className="stat-card__icon"><i className="ph-chart-bar" /></div>
          <div className="stat-card__body">
            <p className="stat-card__label">Top Department</p>
            <h3 className="stat-card__value">
              {stats.departmentCounts[0]?._id || '—'}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="dashboard__section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <Link to="/students/add" className="quick-action">
            <i className="ph-user-plus" />
            <span>Add Student</span>
          </Link>
          <Link to="/students" className="quick-action">
            <i className="ph-list-bullets" />
            <span>View All</span>
          </Link>
          <Link to="/students?search=" className="quick-action">
            <i className="ph-magnifying-glass" />
            <span>Search</span>
          </Link>
          <Link to="/profile" className="quick-action">
            <i className="ph-user-circle" />
            <span>Profile</span>
          </Link>
        </div>
      </div>

      {/* Bottom grid: recent students + department breakdown */}
      <div className="dashboard__grid">
        {/* Recent Students */}
        <div className="dashboard__card">
          <div className="card-header">
            <h3>Recent Students</h3>
            <Link to="/students" className="card-link">View all</Link>
          </div>
          {stats.recentStudents.length === 0 ? (
            <div className="empty-state-small">No students added yet.</div>
          ) : (
            <div className="recent-list">
              {stats.recentStudents.map((s) => (
                <Link key={s._id} to={`/students/${s._id}`} className="recent-item">
                  <div className="recent-avatar" style={{ backgroundColor: deptColors[s.department] || '#6b7280' }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="recent-info">
                    <p className="recent-name">{s.name}</p>
                    <p className="recent-meta">{s.registerNumber} · {s.department}</p>
                  </div>
                  <span className="recent-year">Year {s.year}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Department breakdown */}
        <div className="dashboard__card">
          <div className="card-header">
            <h3>By Department</h3>
          </div>
          {stats.departmentCounts.length === 0 ? (
            <div className="empty-state-small">No data yet.</div>
          ) : (
            <div className="dept-list">
              {stats.departmentCounts.map((d) => {
                const pct = stats.totalStudents
                  ? Math.round((d.count / stats.totalStudents) * 100)
                  : 0;
                return (
                  <div key={d._id} className="dept-item">
                    <div className="dept-header">
                      <span
                        className="dept-badge"
                        style={{ backgroundColor: deptColors[d._id] || '#6b7280' }}
                      >
                        {d._id}
                      </span>
                      <span className="dept-count">{d.count} student{d.count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="dept-bar-bg">
                      <div
                        className="dept-bar-fill"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: deptColors[d._id] || '#6b7280',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper: returns "Morning", "Afternoon", or "Evening" based on current hour
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

export default DashboardPage;
