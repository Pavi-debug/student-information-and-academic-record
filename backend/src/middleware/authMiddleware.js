// middleware/authMiddleware.js
// This middleware runs BEFORE protected route handlers.
// It checks if the request has a valid JWT token.

import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  try {
    // Get the Authorization header
    // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const authHeader = req.headers.authorization;

    // Check if token exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized. No token provided.' });
    }

    // Extract the token part (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    // If the token is invalid or expired, this throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    // Now any route handler can access req.user
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed (expired, tampered, etc.)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please login again.' });
    }
    return res.status(401).json({ message: 'Not authorized. Invalid token.' });
  }
};

export default protect;
