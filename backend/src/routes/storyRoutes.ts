import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  getStories,
  getStory,
  createStory,
  deleteStory
} from '../controllers/storyController';

const router = Router();

// Route tanımlamaları
router.get('/', auth, getStories);
router.get('/:id', auth, getStory as any); // Geçici çözüm
router.post('/', auth, createStory as any);
router.delete('/:id', auth, deleteStory as any); // Geçici çözüm

export default router;