import express from 'express';

// Import controllers and middlewares
import CategoryControllers from '../controllers/category.controller.js'
const router = express.Router();

// Define routes
router.post('/', CategoryControllers.createCategory);
router.get('/', CategoryControllers.getAllCategory);
router.get('/:id', CategoryControllers.getOneCategory);
router.put('/:id', CategoryControllers.updateCategory);
router.delete('/:id', CategoryControllers.deleteCategory);

export default router;