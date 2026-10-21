// src/controllers/academicController.js
// Business logic for student academic record management.

import AcademicRecord from '../models/AcademicRecord.js';
import Student from '../models/Student.js';

// @desc    Add academic record for a student
// @route   POST /api/students/:studentId/academic-records
// @access  Private
export const addAcademicRecord = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { semester, subject, marks, grade, attendancePercentage, academicYear } = req.body;

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      res.status(404);
      throw new Error('Student not found');
    }

    const record = await AcademicRecord.create({
      student: studentId,
      semester,
      subject,
      marks,
      grade,
      attendancePercentage,
      academicYear,
    });

    res.status(201).json({
      success: true,
      message: 'Academic record added successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all academic records for a student
// @route   GET /api/students/:studentId/academic-records
// @access  Private
export const getAcademicRecordsByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      res.status(404);
      throw new Error('Student not found');
    }

    const records = await AcademicRecord.find({ student: studentId }).sort({ semester: 1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an academic record
// @route   PUT /api/academic-records/:id
// @access  Private
export const updateAcademicRecord = async (req, res, next) => {
  try {
    const record = await AcademicRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!record) {
      res.status(404);
      throw new Error('Academic record not found');
    }

    res.status(200).json({
      success: true,
      message: 'Academic record updated successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an academic record
// @route   DELETE /api/academic-records/:id
// @access  Private
export const deleteAcademicRecord = async (req, res, next) => {
  try {
    const record = await AcademicRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      res.status(404);
      throw new Error('Academic record not found');
    }

    res.status(200).json({
      success: true,
      message: 'Academic record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
