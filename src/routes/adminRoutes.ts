import { Router } from 'express';

import { verifyToken } from '../middlewares/tokenChecker';
import { AdminController } from '../controllers/adminController';
import { BookingController } from '../controllers/bookingController';
import { upload } from '../middlewares/multer';
import { roleChecker } from '../middlewares/roleChecker';

const adminController = new AdminController();
const bookingController = new BookingController();
const router = Router();

router.post('/login', adminController.login); //validate credentials and provide token
router.get('/users', verifyToken, adminController.getUsers); // send all the user documents from database
router.get('/staffs', verifyToken, adminController.getStaffs); // send all the user documents from database
router.put(
  '/editUsers/:id',
  verifyToken,
  roleChecker('admin'),
  adminController.updateUser
); // update user in the database
router.get('/editUser/:id', verifyToken, adminController.getUser); //retrieve a user from database
router.patch(
  '/blockUser',
  verifyToken,
  roleChecker('admin'),
  adminController.blockUser
); //block a user
router.patch(
  '/unblockUser',
  verifyToken,
  roleChecker('admin'),
  adminController.unblockUser
); //unblock user
router.post(
  '/addDept',
  upload.single('file'),
  verifyToken,
  roleChecker('admin'),
  adminController.createDept
); //create a new department
router.get('/getDept', adminController.getDept); //get all departments
router.get('/totalCount/:model', verifyToken, adminController.getCount); //get count of documents
router.get('/getBookings', verifyToken, bookingController.getAllBookedSlots); // get all booked slots
router.get('/departmentSlots', verifyToken, adminController.patientsPerDept); // get number of patients per department
router.put(
  '/editDepartment/:id',
  verifyToken,
  roleChecker('admin'),
  adminController.updateDept
); //update department name

export default router;
