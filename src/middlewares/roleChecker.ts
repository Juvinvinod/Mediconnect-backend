import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { NotFoundError } from '../common/errors/notFoundError';
import { ForbiddenError } from '../common/errors/forbiddenError';

const adminService = new AdminService(); // create an instance of adminService

export class RoleChecker {
  userChecker = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.body as { _id?: string })?._id;
    if (id) {
      const document = await adminService.getUser(id);
      if (document) {
        if (document[0].is_blocked) {
          throw new ForbiddenError('Your account has been blocked');
        } else {
          next();
        }
      } else {
        throw new ForbiddenError('You do not have access to this page');
      }
    } else {
      throw new NotFoundError('id not found');
    }
  };
}