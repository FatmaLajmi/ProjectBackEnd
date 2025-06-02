import { Router } from 'express';
import exampleRoutes from './example.route.js';
import UserRoutes from './user.route.js';
import CategoryRoutes from './category.route.js';

const router = Router();
router.use('/examples', exampleRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);

export default router;