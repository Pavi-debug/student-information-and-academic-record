// models/Student.js
// This defines the Student schema — the shape/structure of student data in MongoDB.

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true, // removes extra whitespace
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    registerNumber: {
      type: String,
      required: [true, 'Register number is required'],
      unique: true, // no two students can have the same register number
      trim: true,
      uppercase: true, // store as uppercase for consistency
    },

    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: ['BCA', 'BCS', 'MCA', 'BSC', 'MBA', 'BE', 'BTech', 'Other'],
        message: '{VALUE} is not a valid department',
      },
    },

    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1, 'Year must be between 1 and 4'],
      max: [4, 'Year must be between 1 and 4'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // no duplicate emails
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
    },

    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      maxlength: [300, 'Address cannot exceed 300 characters'],
    },
  },
  {
    // timestamps: true automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create the model from the schema
// mongoose.model('Student', studentSchema) creates a 'students' collection in MongoDB
const Student = mongoose.model('Student', studentSchema);

export default Student;
