import express from 'express';

import OrderControllers from '../controllers/order.controller.js'
const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrder);
router.get('/:id', OrderControllers.getOneOrder);
router.put('/:id', OrderControllers.updateOrder);
router.delete('/:id', OrderControllers.deleteOrder);

export default router;