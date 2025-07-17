import express from 'express';
import UserControllers from '../controllers/user.controller.js'
import OrderControllers from '../controllers/order.controller.js'
import isAuth from '../middlewares/auth.middlewear.js';
import isAdmin from '../middlewares/admin.middlewear.js';

const router = express.Router();

router.post('/',isAuth,isAdmin, UserControllers.createUser);
router.get('/orders',OrderControllers.getOrderByUser);
router.get('/',isAuth,isAdmin, UserControllers.getAllUser);
router.get('/:id',isAuth,isAdmin, UserControllers.getOneUser);
router.put('/:id',isAuth,isAdmin, UserControllers.updateUser);
router.delete('/:id',isAuth,isAdmin, UserControllers.deleteUser);

export default router;