// routes/studentRoutes.js
// Defines the URL paths for student CRUD operations.
// All routes are protected — only logged-in admins can access them.

import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} from '../controllers/studentController.js';

const router = express.Router();

// ─── Stats ───────────────────────────────────
// GET /api/students/stats — dashboard statistics
// NOTE: This route must come BEFORE /:id to avoid "stats" being treated as an ID
router.get('/stats', protect, getDashboardStats);

// ─── CRUD ────────────────────────────────────
// GET  /api/students      — get all students (with optional ?search=query)
// POST /api/students      — add a new student
router.route('/').get(protect, getAllStudents).post(protect, addStudent);

// GET    /api/students/:id — get one student
// PUT    /api/students/:id — update a student
// DELETE /api/students/:id — delete a student
router
  .route('/:id')
  .get(protect, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

export default router;
