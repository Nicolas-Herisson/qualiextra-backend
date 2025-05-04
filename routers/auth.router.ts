import { Router } from 'express';
import * as authController from '../controllers/auth.controller.ts';
import { sanitizer } from '../middlewares/sanitizer.middleware.ts';

const authRouter: Router = Router();

authRouter.get('/verify/:token', authController.verifyEmail);

authRouter.use(sanitizer);
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

export default authRouter;
