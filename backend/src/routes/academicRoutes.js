// src/routes/academicRoutes.js
// Routes for managing student academic records.

import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  addAcademicRecord,
  getAcademicRecordsByStudent,
  updateAcademicRecord,
  deleteAcademicRecord,
} from '../controllers/academicController.js';

const router = express.Router({ mergeParams: true });

// Student specific academic records: /api/students/:studentId/academic-records
router
  .route('/')
  .post(protect, addAcademicRecord)
  .get(protect, getAcademicRecordsByStudent);

// Direct academic record modification by ID: /api/academic-records/:id
export const academicRecordItemRouter = express.Router();
academicRecordItemRouter
  .route('/:id')
  .put(protect, updateAcademicRecord)
  .delete(protect, deleteAcademicRecord);

export default router;
