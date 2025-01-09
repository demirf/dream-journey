import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  signInWithApple,
  getProfile,
  getUserStats
} from '../controllers/userController';

const router = Router();

// Public routes
router.post('/signin/apple', signInWithApple);
router.get('/profile', auth, getProfile as any);
router.get('/stats', auth, getUserStats);

export default router;