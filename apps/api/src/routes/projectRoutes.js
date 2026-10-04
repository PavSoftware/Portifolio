import express from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import upload from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Admin routes (protected)
router.post('/', authenticate, upload.single('image'), createProject);
router.put('/:id', authenticate, upload.single('image'), updateProject);
router.delete('/:id', authenticate, deleteProject);

export default router;
