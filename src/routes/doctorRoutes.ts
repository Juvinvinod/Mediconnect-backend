import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController';
import { validateRequest } from '../middlewares/validateRequest';
import { doctorSignupValidator } from '../middlewares/doctorSignupValidator';
import { verifyToken } from '../middlewares/tokenChecker';
import { BookingController } from '../controllers/bookingController';
import { roleChecker } from '../middlewares/roleChecker';

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
router.get('/doctors', doctorController.getDoctors); // send all the user documents from database
router.put(
  '/editDoctor/:id',
  verifyToken,
  roleChecker('doctor'),
  doctorController.updateDoctor
); // update user in the database
router.patch(
  '/blockDoctor',
  verifyToken,
  roleChecker('doctor'),
  doctorController.blockDoctor
); //block a doctor
router.patch(
  '/unblockDoctor',
  verifyToken,
  roleChecker('doctor'),
  doctorController.unblockDoctor
); //unblock doctor
router.get('/profile', verifyToken, doctorController.getProfile); // get doctor profile
router.put(
  '/password',
  verifyToken,
  roleChecker('doctor'),
  doctorController.updatePassword
); // update user in the database
router.post(
  '/createSlot',
  verifyToken,
  roleChecker('doctor'),
  doctorController.makeSlot
); //create slots
router.get('/getSlots', verifyToken, bookingController.getDoctorBookingDocs); // get all booking related to doctor
router.put(
  '/updateSlot',
  verifyToken,
  roleChecker('doctor'),
  bookingController.updateSlots
); //update booking slot
router.get('/mySlots', verifyToken, bookingController.createdDocSlots); //get slots created by the doctor
router.delete(
  '/deleteSlot/:time',
  verifyToken,
  roleChecker('doctor'),
  bookingController.deleteSlot
); // delete a slot

export default router;
