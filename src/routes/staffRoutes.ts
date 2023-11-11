import { Router } from 'express';

import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { StaffController } from '../controllers/staffController';

const staffController = new StaffController();
const router = Router();

router.post(
  '/signUp',
  signupValidator,
  validateRequest,
  staffController.signup
); //create a new staff
router.post('/login', staffController.login); //validate credentials and provide token

export default router;
