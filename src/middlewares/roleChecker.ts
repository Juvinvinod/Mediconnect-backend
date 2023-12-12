import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { NotFoundError } from '../common/errors/notFoundError';
import { ForbiddenError } from '../common/errors/forbiddenError';

const adminService = new AdminService(); // create an instance of adminService

export const userChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = (req.body as { _id?: string })?._id;
    if (id) {
      const document = await adminService.getUser(id);
      if (document && document[0].is_blocked) {
        throw new ForbiddenError('Your account has been blocked');
      } else if (document && document[0].is_blocked !== true) {
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
