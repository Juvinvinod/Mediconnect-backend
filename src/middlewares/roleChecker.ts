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
      if (document) {
        //   if (document[0].is_blocked === true) {
        //     throw new ForbiddenError('Your account has been blocked');
        //   } else {
        //     next();
        //   }
        console.log(document);

        throw new ForbiddenError('You do not have access to this page');
      } else {
        throw new ForbiddenError('You do not have access to this page');
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
