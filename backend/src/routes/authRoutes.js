// routes/authRoutes.js
// Defines the URL paths for authentication.

import express from 'express';
import { loginAdmin } from '../controllers/authController.js';

const router = express.Router();

// POST /api/login — Admin login
router.post('/login', loginAdmin);

export default router;
