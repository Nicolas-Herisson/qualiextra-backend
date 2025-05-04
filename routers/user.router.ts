import { Router } from 'express';
import * as userController from '../controllers/user.controller.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import { isAdmin } from '../middlewares/isAdmin.middleware.ts';

const userRouter: Router = Router();

userRouter.get('/private', authenticate, userController.getUser);
userRouter.put('/private', authenticate, userController.updateUser);

userRouter.get('/private/list', isAdmin, userController.getUsers);
userRouter.get('/private/:id', isAdmin, userController.getUserById);
userRouter.put('/private/:id', isAdmin, userController.updateUserById);
userRouter.delete('/private/:id', isAdmin, userController.deleteUserById);
export default userRouter;
