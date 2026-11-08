import express from 'express';
import { getUser, login, logout, register } from './auth.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', authenticate, getUser);
authRoutes.post('/logout', authenticate, logout);

export default authRoutes;