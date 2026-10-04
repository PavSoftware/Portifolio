import express from 'express';
import { login, getProfile, updateProfile } from '../controllers/authController.js';
import { getStats } from '../controllers/adminController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/stats', authenticate, getStats);

export default router;
