import express from 'express';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import upload from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', authenticate, upload.single('avatar'), createTestimonial);
router.delete('/:id', authenticate, deleteTestimonial);

export default router;
