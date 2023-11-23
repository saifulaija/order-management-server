import express from 'express';

import { userController } from './user.controller';
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.put('/:userId/orders', userController.createOrder);

export const userRoutes = router;
