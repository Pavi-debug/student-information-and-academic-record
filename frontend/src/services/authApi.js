// services/authApi.js
// API endpoints for admin authentication.

import api from './api.js';

export const loginAdmin = (credentials) => api.post('/login', credentials);
