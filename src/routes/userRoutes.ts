import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { verifyToken } from '../middlewares/tokenChecker';
import { AdminController } from '../controllers/adminController';
import { DoctorController } from '../controllers/doctorController';
import { BookingController } from '../controllers/bookingController';
import { roleChecker } from '../middlewares/roleChecker';

const userController = new UserController();
const adminController = new AdminController();
const doctorController = new DoctorController();
const bookingController = new BookingController();

const router = Router();

router.post('/signUp', signupValidator, validateRequest, userController.signup); //create a new user
router.post('/login', userController.login); //validate credentials and provide token
router.get('/profile', verifyToken, userController.getUser); // get staff profile
router.put(
  '/editUsers/:id',
  verifyToken,
  roleChecker('user'),
  adminController.updateUser
); // update user in the database
router.put(
  '/password',
  verifyToken,
  roleChecker('user'),
  userController.updatePassword
); // update user in the database
router.get('/doctorProfile/:id', doctorController.getDoctor); // get doctor profile

//booking routes
router.get('/getSlots/:id', bookingController.getUser); // get all slots belonging to a doctor
router.put(
  '/bookSlot',
  verifyToken,
  roleChecker('user'),
  bookingController.bookSlot
); // book a slot
router.get('/getSlots', verifyToken, bookingController.getBookingDocs); //get all booking docs
router.get('/getSlot/:id', verifyToken, bookingController.getSlot); //get a slot detail
router.put(
  '/cancelSlot',
  verifyToken,
  roleChecker('user'),
  bookingController.cancelSlot
); //cancel a booked slot
router.post('/forgetPassword', userController.emailChecker); //check if an email exists
router.get('/reset/:token', userController.resetTokenChecker); // check if the send token is valid
router.post('/forgetPassword/:token', userController.resetPassword); //add the new password to database
// router.post('/email/:token',userController.verifyAccount);

export default router;
