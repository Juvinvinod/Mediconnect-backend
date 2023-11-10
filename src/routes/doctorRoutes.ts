import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController';
import { validateRequest } from '../middlewares/validateRequest';
import { doctorSignupValidator } from '../middlewares/doctorSignupValidator';

const doctorController = new DoctorController();
const router = Router();

router.post(
  '/signUp',
  doctorSignupValidator,
  validateRequest,
  doctorController.signup
); //create a new user
router.post('/login', doctorController.login); //validate credentials and provide token
router.get('/doctors', doctorController.getDoctors); // send all the user documents from database

export default router;
