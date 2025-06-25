import { Router } from 'express';
import exampleRoutes from './example.route.js';
import UserRoutes from './user.route.js';
import CategoryRoutes from './category.route.js';
import ProductsRoutes from './product.route.js';
import OrderRoutes from './order.route.js';
import authRoutes from './authentification.route.js'

const router = Router();
router.use('/examples', exampleRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);
router.use('/products', ProductsRoutes);
router.use('/orders', OrderRoutes);
router.use('/authentification',authRoutes);

export default router;