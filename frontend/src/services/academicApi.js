// services/academicApi.js
// API endpoints for student academic records.

import api from './api.js';

export const getAcademicRecordsByStudent = (studentId) =>
  api.get(`/students/${studentId}/academic-records`);

export const addAcademicRecord = (studentId, data) =>
  api.post(`/students/${studentId}/academic-records`, data);

export const updateAcademicRecord = (id, data) =>
  api.put(`/academic-records/${id}`, data);

export const deleteAcademicRecord = (id) =>
  api.delete(`/academic-records/${id}`);
