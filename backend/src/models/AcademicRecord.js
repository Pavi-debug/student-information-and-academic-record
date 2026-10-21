// src/models/AcademicRecord.js
// Schema for student academic performance records (marks, grades, attendance).

import mongoose from 'mongoose';

const academicRecordSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
      min: [1, 'Semester must be between 1 and 8'],
      max: [8, 'Semester must be between 1 and 8'],
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    marks: {
      type: Number,
      required: [true, 'Marks are required'],
      min: [0, 'Marks cannot be negative'],
      max: [100, 'Marks cannot exceed 100'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: ['S', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'],
      default: 'F',
    },
    attendancePercentage: {
      type: Number,
      required: [true, 'Attendance percentage is required'],
      min: [0, 'Attendance cannot be negative'],
      max: [100, 'Attendance cannot exceed 100'],
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required (e.g. 2025-2026)'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);

export default AcademicRecord;
