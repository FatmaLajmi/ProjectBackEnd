import { Router } from 'express';
import exampleRoutes from './example.route.js';
import UserRoutes from './user.route.js';

const router = Router();
router.use('/examples', exampleRoutes);
router.use('/users', UserRoutes);

export default router;