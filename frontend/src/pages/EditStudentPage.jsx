// pages/EditStudentPage.jsx
// Loads an existing student's data and pre-fills the form for editing.

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/api.js';
import StudentForm from '../components/StudentForm.jsx';
import Spinner from '../components/Spinner.jsx';
import Toast from '../components/Toast.jsx';

function EditStudentPage() {
  const { id } = useParams(); // get :id from the URL
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch the student's current data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentById(id);
        setStudent(res.data.student);
      } catch (err) {
        setToast({ message: 'Student not found', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await updateStudent(id, formData);
      setToast({ message: 'Student updated successfully!', type: 'success' });
      setTimeout(() => navigate(`/students/${id}`), 1500);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to update student',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner text="Loading student..." />;

  return (
    <div className="form-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/students">Students</Link>
        <i className="ph-caret-right" />
        {student && <Link to={`/students/${id}`}>{student.name}</Link>}
        <i className="ph-caret-right" />
        <span>Edit</span>
      </div>

      <div className="form-card">
        <div className="form-card__header">
          <div className="form-card__icon form-card__icon--edit">
            <i className="ph-pencil" />
          </div>
          <div>
            <h2>Edit Student</h2>
            <p>Update the student's information below</p>
          </div>
        </div>

        {student && (
          <StudentForm
            initialData={{
              name: student.name,
              registerNumber: student.registerNumber,
              department: student.department,
              year: String(student.year),
              email: student.email,
              phone: student.phone,
              address: student.address,
            }}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel="Update Student"
          />
        )}
      </div>
    </div>
  );
}

export default EditStudentPage;
