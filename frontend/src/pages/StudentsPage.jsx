// pages/StudentsPage.jsx
// Lists all students with search, view, edit, delete actions.

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../services/api.js';
import Spinner from '../components/Spinner.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

function StudentsPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null); // student to delete
  const [toast, setToast] = useState(null);

  // Fetch students — re-run when searchQuery changes
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllStudents(searchQuery);
      setStudents(res.data.students);
    } catch (err) {
      showToast('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Debounce search: wait 400ms after user stops typing
    const timer = setTimeout(fetchStudents, 400);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudent(deleteTarget._id);
      showToast(`${deleteTarget.name} deleted successfully`);
      setStudents((prev) => prev.filter((s) => s._id !== deleteTarget._id));
    } catch (err) {
      showToast('Failed to delete student', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  const YEAR_LABELS = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };

  return (
    <div className="students-page">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <ConfirmModal
          studentName={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Page header */}
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>{students.length} record{students.length !== 1 ? 's' : ''} found</p>
        </div>
        <Link to="/students/add" className="btn btn--primary">
          <i className="ph-user-plus" />
          Add Student
        </Link>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <i className="ph-magnifying-glass search-bar__icon" />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search by name or register number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-bar__clear" onClick={() => setSearchQuery('')}>
            <i className="ph-x" />
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <Spinner text="Loading students..." />
      ) : students.length === 0 ? (
        <div className="empty-state">
          <i className="ph-users" />
          <h3>{searchQuery ? 'No students match your search' : 'No students yet'}</h3>
          <p>{searchQuery ? 'Try a different name or register number.' : 'Click "Add Student" to get started.'}</p>
          {!searchQuery && (
            <Link to="/students/add" className="btn btn--primary">
              <i className="ph-user-plus" />
              Add First Student
            </Link>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Reg. Number</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={s._id}>
                  <td className="table-index">{index + 1}</td>
                  <td>
                    <div className="table-student">
                      <div className="table-avatar">{s.name.charAt(0)}</div>
                      <span className="table-name">{s.name}</span>
                    </div>
                  </td>
                  <td><span className="reg-badge">{s.registerNumber}</span></td>
                  <td><span className="dept-tag">{s.department}</span></td>
                  <td>{YEAR_LABELS[s.year] || `Year ${s.year}`}</td>
                  <td className="table-email">{s.email}</td>
                  <td>{s.phone}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn action-btn--view"
                        onClick={() => navigate(`/students/${s._id}`)}
                        title="View details"
                      >
                        <i className="ph-eye" />
                      </button>
                      <button
                        className="action-btn action-btn--edit"
                        onClick={() => navigate(`/students/edit/${s._id}`)}
                        title="Edit student"
                      >
                        <i className="ph-pencil" />
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        onClick={() => setDeleteTarget(s)}
                        title="Delete student"
                      >
                        <i className="ph-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentsPage;
