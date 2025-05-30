import express from 'express';

// Import controllers and middlewares
import UserControllers from '../controllers/user.controller.js'
const router = express.Router();

// Define routes
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:id', UserControllers.getOneUser);
router.put('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);

export default router;