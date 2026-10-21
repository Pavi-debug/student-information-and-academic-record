// pages/AddStudentPage.jsx
// Page to add a new student. Uses the shared StudentForm component.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addStudent } from '../services/api.js';
import StudentForm from '../components/StudentForm.jsx';
import Toast from '../components/Toast.jsx';

function AddStudentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await addStudent(formData);
      setToast({ message: 'Student added successfully!', type: 'success' });
      // Redirect to students list after a short delay
      setTimeout(() => navigate('/students'), 1500);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to add student',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/students">Students</Link>
        <i className="ph-caret-right" />
        <span>Add Student</span>
      </div>

      <div className="form-card">
        <div className="form-card__header">
          <div className="form-card__icon">
            <i className="ph-user-plus" />
          </div>
          <div>
            <h2>Add New Student</h2>
            <p>Fill in the details below to register a new student</p>
          </div>
        </div>

        <StudentForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Add Student"
        />
      </div>
    </div>
  );
}

export default AddStudentPage;
