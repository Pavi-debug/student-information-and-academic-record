// services/studentApi.js
// API endpoints for student management operations.

import api from './api.js';

export const getAllStudents = (search = '') =>
  api.get(`/students${search ? `?search=${encodeURIComponent(search)}` : ''}`);

export const getStudentById = (id) => api.get(`/students/${id}`);

export const addStudent = (data) => api.post('/students', data);

export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getDashboardStats = () => api.get('/students/stats');
