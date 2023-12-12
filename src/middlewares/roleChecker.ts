import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { NotFoundError } from '../common/errors/notFoundError';
import { ForbiddenError } from '../common/errors/forbiddenError';
import { DoctorService } from '../services/doctorService';
import { StaffService } from '../services/staffService';

const adminService = new AdminService(); // create an instance of adminService
const doctorService = new DoctorService(); // create an instance of doctorService
const staffService = new StaffService(); // create an instance of userService

export const roleChecker =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = (req.body as { _id?: string })?._id;
      if (id) {
        let document = null;
        if (role === 'user' || role === 'admin') {
          document = await adminService.getUser(id);
        } else if (role === 'doctor') {
          document = await doctorService.getDoctor(id);
        } else if (role === 'staff') {
          document = await staffService.getStaff(id);
        }
        if (document?.[0].is_blocked) {
          throw new ForbiddenError('Your account has been blocked');
        } else if (
          document &&
          document[0].is_blocked !== true &&
          document[0].role === role
        ) {
          next();
        } else {
          throw new ForbiddenError('You do not have access');
        }
      } else {
        throw new NotFoundError('id not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };
