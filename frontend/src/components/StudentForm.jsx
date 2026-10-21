// components/StudentForm.jsx
// Reusable form for both Adding and Editing a student.
// Props:
//   initialData — pre-filled values when editing
//   onSubmit    — called with form data when user submits
//   loading     — disables button while API call is pending
//   submitLabel — button text ("Add Student" or "Update Student")

import React, { useState } from 'react';

const DEPARTMENTS = ['BCA', 'BCS', 'MCA', 'BSC', 'MBA', 'BE', 'BTech', 'Other'];
const YEARS = [1, 2, 3, 4];

const EMPTY_FORM = {
  name: '',
  registerNumber: '',
  department: '',
  year: '',
  email: '',
  phone: '',
  address: '',
};

function StudentForm({ initialData = EMPTY_FORM, onSubmit, loading, submitLabel = 'Save Student' }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Frontend validation ───────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.registerNumber.trim()) newErrors.registerNumber = 'Register number is required';

    if (!formData.department) newErrors.department = 'Department is required';

    if (!formData.year) newErrors.year = 'Year is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number (starts with 6-9)';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            placeholder="e.g. Priya Sharma"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        {/* Register Number */}
        <div className="form-group">
          <label className="form-label" htmlFor="registerNumber">
            Register Number <span className="required">*</span>
          </label>
          <input
            id="registerNumber"
            name="registerNumber"
            type="text"
            className={`form-input ${errors.registerNumber ? 'form-input--error' : ''}`}
            placeholder="e.g. BCA2024001"
            value={formData.registerNumber}
            onChange={handleChange}
          />
          {errors.registerNumber && <p className="form-error">{errors.registerNumber}</p>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label className="form-label" htmlFor="department">
            Department <span className="required">*</span>
          </label>
          <select
            id="department"
            name="department"
            className={`form-input ${errors.department ? 'form-input--error' : ''}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.department && <p className="form-error">{errors.department}</p>}
        </div>

        {/* Year */}
        <div className="form-group">
          <label className="form-label" htmlFor="year">
            Year <span className="required">*</span>
          </label>
          <select
            id="year"
            name="year"
            className={`form-input ${errors.year ? 'form-input--error' : ''}`}
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}{['st','nd','rd','th'][y-1]} Year</option>
            ))}
          </select>
          {errors.year && <p className="form-error">{errors.year}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
            placeholder="e.g. priya@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number <span className="required">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
            placeholder="e.g. 9876543210"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        {/* Address — full width */}
        <div className="form-group form-group--full">
          <label className="form-label" htmlFor="address">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            className={`form-input form-textarea ${errors.address ? 'form-input--error' : ''}`}
            placeholder="Enter full address..."
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="form-error">{errors.address}</p>}
        </div>
      </div>

      {/* Submit */}
      <div className="form-submit">
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? (
            <>
              <span className="btn-spinner" />
              Saving...
            </>
          ) : (
            <>
              <i className="ph-floppy-disk" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
