import { Router } from 'express';

import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { StaffController } from '../controllers/staffController';
import { verifyToken } from '../middlewares/tokenChecker';

const staffController = new StaffController();
const router = Router();

router.post(
  '/signUp',
  signupValidator,
  validateRequest,
  staffController.signup
); //create a new staff
router.post('/login', staffController.login); //validate credentials and provide token
router.put('/editStaff/:id', verifyToken, staffController.updateStaff); // update staff in the database
router.get('/staffs', verifyToken, staffController.getStaffs); // send all the user documents from database
router.patch('/blockStaff', verifyToken, staffController.blockStaff); //block a staff
router.patch('/unblockStaff', verifyToken, staffController.unblockStaff); //unblock staff
router.get('/profile', verifyToken, staffController.getStaff); // get staff profile
router.put('/password', verifyToken, staffController.updatePassword); // update user in the database

export default router;
