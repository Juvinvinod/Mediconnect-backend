import { UserService } from '../services/userService';
import { StaffService } from '../services/staffService';
import { DoctorService } from '../services/doctorService';

const staffService = new StaffService(); // create an instance of adminService
const doctorService = new DoctorService(); // create an instance of doctorService
const userService = new UserService(); // create an instance of userService

export const emailCheck = (role: string, email: string) => {
  if (role === 'user') {
    return userService.getUserByEmail(email);
  } else if (role === 'doctor') {
    return doctorService.getDoctorByEmail(email);
  } else {
    return staffService.getStaffByEmail(email);
  }
};
