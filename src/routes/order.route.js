import express from 'express';
import OrderControllers from '../controllers/order.controller.js';
import isAuth from '../middlewares/auth.middlewear.js';
import isAdmin from '../middlewares/admin.middlewear.js';

const router = express.Router();

router.post('/', isAuth, OrderControllers.createOrder);
router.get('/search', isAuth, isAdmin, OrderControllers.getOrderByStatus);
router.put('/:id', isAuth, OrderControllers.updateOrder);
router.delete('/:id', isAuth, OrderControllers.deleteOrder);
router.get('/', isAuth, isAdmin, OrderControllers.getAllOrder);
router.get('/:id', isAuth, isAdmin, OrderControllers.getOneOrder);
router.get('/orders',isAuth, OrderControllers.getOrderByUser);

export default router;