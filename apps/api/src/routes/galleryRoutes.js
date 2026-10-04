import express from 'express';
import { getGallery, uploadImage, deleteImage } from '../controllers/galleryController.js';
import upload from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', authenticate, upload.single('image'), uploadImage);
router.delete('/:id', authenticate, deleteImage);

export default router;
