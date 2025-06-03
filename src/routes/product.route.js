import express from 'express';

// Import controllers and middlewares
import ProductControllers from '../controllers/product.controller.js'
const router = express.Router();

// Define routes
router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/search', ProductControllers.getProductByCategory);
router.get('/:id', ProductControllers.getOneProduct);
router.put('/:id', ProductControllers.updateProduct);
router.delete('/:id', ProductControllers.deleteProduct);


export default router;