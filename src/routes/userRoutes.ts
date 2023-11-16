import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { verifyToken } from '../middlewares/tokenChecker';
import { AdminController } from '../controllers/adminController';

const userController = new UserController();
const adminController = new AdminController();
const router = Router();

router.post('/signUp', signupValidator, validateRequest, userController.signup); //create a new user
router.post('/login', userController.login); //validate credentials and provide token
router.get('/profile', verifyToken, userController.getUser); // get staff profile
router.put('/editUsers/:id', verifyToken, adminController.updateUser); // update user in the database
router.put('/password', verifyToken, userController.updatePassword); // update user in the database

export default router;
