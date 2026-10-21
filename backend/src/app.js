// src/app.js
// Express application setup and middleware configuration.

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import academicRoutes, { academicRecordItemRouter } from './routes/academicRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// ─── Global Middleware ─────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// ─── API Routes ────────────────────────────────
app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/students/:studentId/academic-records', academicRoutes);
app.use('/api/academic-records', academicRecordItemRouter);

// ─── Health Check Endpoint ─────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Student Management System API is running ✅' });
});

// ─── Error Handling Middleware ─────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
