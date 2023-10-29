import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';

const userController = new UserController();
const router = Router();

router.post('/signUp', signupValidator, validateRequest, userController.signup); //create a new user

export default router;
