// pages/StudentDetailPage.jsx
// Shows full details of a single student with edit and delete options.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById, deleteStudent } from '../services/api.js';
import Spinner from '../components/Spinner.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getStudentById(id);
        setStudent(res.data.student);
      } catch (err) {
        setToast({ message: 'Student not found', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteStudent(id);
      navigate('/students', { state: { toast: 'Student deleted' } });
    } catch {
      setToast({ message: 'Failed to delete student', type: 'error' });
      setShowDeleteModal(false);
    }
  };

  if (loading) return <Spinner text="Loading student..." />;
  if (!student) return (
    <div className="error-state">
      <i className="ph-user-x" />
      <p>Student not found.</p>
      <Link to="/students" className="btn btn--primary">Back to Students</Link>
    </div>
  );

  const YEAR_LABELS = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };
  const addedDate = new Date(student.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="detail-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showDeleteModal && (
        <ConfirmModal
          studentName={student.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/students">Students</Link>
        <i className="ph-caret-right" />
        <span>{student.name}</span>
      </div>

      {/* Profile card */}
      <div className="detail-card">
        <div className="detail-card__header">
          <div className="detail-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="detail-meta">
            <h2>{student.name}</h2>
            <span className="reg-badge">{student.registerNumber}</span>
            <div className="detail-tags">
              <span className="dept-tag">{student.department}</span>
              <span className="year-tag">{YEAR_LABELS[student.year]}</span>
            </div>
          </div>
          <div className="detail-actions">
            <Link to={`/students/edit/${id}`} className="btn btn--outline">
              <i className="ph-pencil" />
              Edit
            </Link>
            <button className="btn btn--danger" onClick={() => setShowDeleteModal(true)}>
              <i className="ph-trash" />
              Delete
            </button>
          </div>
        </div>

        {/* Info fields */}
        <div className="detail-grid">
          <div className="detail-field">
            <label><i className="ph-user" /> Full Name</label>
            <p>{student.name}</p>
          </div>
          <div className="detail-field">
            <label><i className="ph-identification-card" /> Register Number</label>
            <p>{student.registerNumber}</p>
          </div>
          <div className="detail-field">
            <label><i className="ph-buildings" /> Department</label>
            <p>{student.department}</p>
          </div>
          <div className="detail-field">
            <label><i className="ph-graduation-cap" /> Year</label>
            <p>{YEAR_LABELS[student.year]}</p>
          </div>
          <div className="detail-field">
            <label><i className="ph-envelope" /> Email</label>
            <p><a href={`mailto:${student.email}`}>{student.email}</a></p>
          </div>
          <div className="detail-field">
            <label><i className="ph-phone" /> Phone</label>
            <p><a href={`tel:${student.phone}`}>{student.phone}</a></p>
          </div>
          <div className="detail-field detail-field--full">
            <label><i className="ph-map-pin" /> Address</label>
            <p>{student.address}</p>
          </div>
          <div className="detail-field">
            <label><i className="ph-calendar-plus" /> Added On</label>
            <p>{addedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailPage;
