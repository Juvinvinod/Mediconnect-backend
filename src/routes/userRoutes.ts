import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { signupValidator } from '../middlewares/signupValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { verifyToken } from '../middlewares/tokenChecker';
import { AdminController } from '../controllers/adminController';
import { DoctorController } from '../controllers/doctorController';
import { BookingController } from '../controllers/bookingController';

const userController = new UserController();
const adminController = new AdminController();
const doctorController = new DoctorController();
const bookingController = new BookingController();
const router = Router();

router.post('/signUp', signupValidator, validateRequest, userController.signup); //create a new user
router.post('/login', userController.login); //validate credentials and provide token
router.get('/profile', verifyToken, userController.getUser); // get staff profile
router.put('/editUsers/:id', verifyToken, adminController.updateUser); // update user in the database
router.put('/password', verifyToken, userController.updatePassword); // update user in the database
router.get('/doctorProfile/:id', doctorController.getDoctor); // get doctor profile

//booking routes
router.get('/getSlots/:id', bookingController.getUser); // get all slots belonging to a doctor
router.put('/bookSlot', verifyToken, bookingController.bookSlot); // book a slot
router.get('/getSlots', verifyToken, bookingController.getBookingDocs); //get all booking docs

export default router;
