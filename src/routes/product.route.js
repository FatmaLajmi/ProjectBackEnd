import express from 'express';
import ProductControllers from '../controllers/product.controller.js'
import isAuth from '../middlewares/auth.middlewear.js';
import isAdmin from '../middlewares/admin.middlewear.js';

const router = express.Router();

router.post('/',isAuth, isAdmin, ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/search', ProductControllers.getProductByCategory);
router.get('/:id', ProductControllers.getOneProduct);
router.put('/:id',isAuth, isAdmin, ProductControllers.updateProduct);
router.delete('/:id',isAuth, isAdmin, ProductControllers.deleteProduct);


export default router;