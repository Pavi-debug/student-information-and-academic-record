// controllers/authController.js
// Handles admin login logic.

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Hardcoded admin credentials (in a real app, store in DB with hashed password)
// We pre-hash "admin123" and store it so bcrypt.compare() works correctly
const ADMIN_USERNAME = 'admin';
// bcrypt hash of "admin123" — generated once and stored
const ADMIN_PASSWORD_HASH = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // "password" hashed
// We'll use a dynamic approach instead:

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Step 2: Validate username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Step 3: Validate password
    // For the admin, we compare plain text password directly
    // (In a real app with DB, you'd use bcrypt.compare)
    if (password !== 'admin123') {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Step 4: Create a JWT token
    // jwt.sign(payload, secret, options)
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' }, // payload (data stored in token)
      process.env.JWT_SECRET,                       // secret key
      { expiresIn: '24h' }                          // token expires in 24 hours
    );

    // Step 5: Send the token back to the frontend
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { username: ADMIN_USERNAME, role: 'admin' },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
