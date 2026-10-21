// controllers/studentController.js
// Contains all business logic for student CRUD operations.

import Student from '../models/Student.js';

// ─────────────────────────────────────────────
// @desc    Add a new student
// @route   POST /api/students
// @access  Private (requires JWT)
// ─────────────────────────────────────────────
export const addStudent = async (req, res) => {
  try {
    // Destructure the fields from request body
    const { name, registerNumber, department, year, email, phone, address } = req.body;

    // Check if register number already exists
    const existingReg = await Student.findOne({ registerNumber: registerNumber.toUpperCase() });
    if (existingReg) {
      return res.status(400).json({ message: 'Register number already exists' });
    }

    // Check if email already exists
    const existingEmail = await Student.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create and save new student
    const student = await Student.create({
      name,
      registerNumber,
      department,
      year,
      email,
      phone,
      address,
    });

    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    // Mongoose validation errors have a 'name' of 'ValidationError'
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Duplicate key error (unique constraint)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    console.error('Add student error:', error);
    res.status(500).json({ message: 'Server error while adding student' });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all students (with optional search)
// @route   GET /api/students?search=query
// @access  Private
// ─────────────────────────────────────────────
export const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;

    // Build a filter object for MongoDB
    let filter = {};

    if (search) {
      // $or means: match name OR registerNumber
      // $regex lets us do a partial, case-insensitive search
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },           // 'i' = case-insensitive
          { registerNumber: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // .sort({ createdAt: -1 }) = newest students first
    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ count: students.length, students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
};

// ─────────────────────────────────────────────
// @desc    Get a single student by ID
// @route   GET /api/students/:id
// @access  Private
// ─────────────────────────────────────────────
export const getStudentById = async (req, res) => {
  try {
    // req.params.id = the :id from the URL
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ student });
  } catch (error) {
    // CastError happens when the ID format is invalid (not a valid MongoDB ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Server error while fetching student' });
  }
};

// ─────────────────────────────────────────────
// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private
// ─────────────────────────────────────────────
export const updateStudent = async (req, res) => {
  try {
    const { name, registerNumber, department, year, email, phone, address } = req.body;

    // Check if register number is taken by a DIFFERENT student
    if (registerNumber) {
      const existing = await Student.findOne({
        registerNumber: registerNumber.toUpperCase(),
        _id: { $ne: req.params.id }, // $ne = not equal to current student's id
      });
      if (existing) {
        return res.status(400).json({ message: 'Register number already taken by another student' });
      }
    }

    // Check if email is taken by a DIFFERENT student
    if (email) {
      const existing = await Student.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.params.id },
      });
      if (existing) {
        return res.status(400).json({ message: 'Email already used by another student' });
      }
    }

    // findByIdAndUpdate: find by ID and update with new data
    // { new: true } = return the updated document (not the old one)
    // { runValidators: true } = run schema validations on update too
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, registerNumber, department, year, email, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    console.error('Update student error:', error);
    res.status(500).json({ message: 'Server error while updating student' });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private
// ─────────────────────────────────────────────
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Server error while deleting student' });
  }
};

// ─────────────────────────────────────────────
// @desc    Get dashboard stats
// @route   GET /api/students/stats
// @access  Private
// ─────────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // Get unique department count using distinct()
    const departments = await Student.distinct('department');

    // Get 5 most recently added students
    const recentStudents = await Student.find().sort({ createdAt: -1 }).limit(5);

    // Count students per department
    const departmentCounts = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      totalStudents,
      totalDepartments: departments.length,
      departments,
      recentStudents,
      departmentCounts,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
};
