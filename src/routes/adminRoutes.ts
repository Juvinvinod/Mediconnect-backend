import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';

const adminController = new AdminController();
const router = Router();

router.post('/login', adminController.login); //validate credentials and provide token
router.get('/users', adminController.getUsers); // send all the user documents from database
router.get('/staffs', adminController.getStaffs); // send all the user documents from database
router.put(
  '/editUsers/:id',
  signupValidator,
  validateRequest,
  adminController.updateUser
); // update user in the database
router.get('/editUser/:id', adminController.getUser); //retrieve a user from database
router.patch('/blockUser', adminController.blockUser); //block a user
router.patch('/unblockUser', adminController.unblockUser); //unblock user

export default router;