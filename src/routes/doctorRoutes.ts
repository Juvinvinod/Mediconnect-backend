import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController';
import { validateRequest } from '../middlewares/validateRequest';
import { doctorSignupValidator } from '../middlewares/doctorSignupValidator';
import { verifyToken } from '../middlewares/tokenChecker';
import { BookingController } from '../controllers/bookingController';

const doctorController = new DoctorController();
const bookingController = new BookingController();
const router = Router();

router.post(
  '/signUp',
  doctorSignupValidator,
  validateRequest,
  doctorController.signup
); //create a new user
router.post('/login', doctorController.login); //validate credentials and provide token
router.get('/doctors', verifyToken, doctorController.getDoctors); // send all the user documents from database
router.put('/editDoctor/:id', verifyToken, doctorController.updateDoctor); // update user in the database
router.patch('/blockDoctor', verifyToken, doctorController.blockDoctor); //block a doctor
router.patch('/unblockDoctor', verifyToken, doctorController.unblockDoctor); //unblock doctor
router.get('/profile', verifyToken, doctorController.getProfile); // get doctor profile
router.put('/password', verifyToken, doctorController.updatePassword); // update user in the database
router.post('/createSlot', verifyToken, doctorController.makeSlot); //create slots
router.get('/getSlots', verifyToken, bookingController.getDoctorBookingDocs); // get all booking related to doctor

export default router;
