import express from 'express';
import CategoryControllers from '../controllers/category.controller.js'
import isAuth from '../middlewares/auth.middlewear.js';
import isAdmin from '../middlewares/admin.middlewear.js';

const router = express.Router();

router.post('/',isAuth,isAdmin, CategoryControllers.createCategory);
router.get('/', CategoryControllers.getAllCategory);
router.get('/:id', CategoryControllers.getOneCategory);
router.put('/:id',isAuth,isAdmin, CategoryControllers.updateCategory);
router.delete('/:id',isAuth,isAdmin, CategoryControllers.deleteCategory);

export default router;