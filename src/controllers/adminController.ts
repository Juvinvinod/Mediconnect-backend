import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../common/errors/badRequestError';
import { UserService } from '../services/userService';
import { AdminService } from '../services/adminService';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';
import { login } from '../utilities/loginFunction';
import { BookingService } from '../services/bookingService';
import { IDept } from '../common/types/department';
import { IAdminController } from './interfaces/adminController.interface';
// import cloudinary from '../config/cloudinary';
// import { UploadApiResponse } from 'cloudinary';

const adminService = new AdminService(); // create an instance of adminService
const userService = new UserService(); // create an instance of userService
const bookingService = new BookingService(); // create an instance of bookingService

export class AdminController implements IAdminController {
  // function to check whether user is an admin,if so then provide them with token
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await login(req, res, next, userService, 'admin');
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  // retrieve all users from database
  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await userService.getUsers();
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  // retrieve all staffs from database
  getStaffs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await userService.getStaffs();
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  //update user
  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;

      const user = req.body as IUser;

      await adminService.UpdateUser(id, user);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //find the user from database
  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id;
    const document = await adminService.getUser(id);
    try {
      if (document) {
        res.status(200).send(document);
      } else {
        throw new NotFoundError('Document not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  // function to block user
  blockUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await adminService.blockUser(id);
      res.status(200).json({ success: 'Doctor Blocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  // function to unblock user
  unblockUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await adminService.unblockUser(id);
      res.status(200).json({ success: 'Doctor unblocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //function to create department
  createDept = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // const { image } = req.body as { image: string };

      // const data: UploadApiResponse = await cloudinary.uploader.upload(image, {
      //   folder: 'deptImage',
      // });
      const { dept_name } = req.body as { dept_name: string };
      if (!dept_name) {
        throw new BadRequestError('Invalid request');
      }
      await adminService.createDept({ dept_name });
      res.status(200).json({ success: 'Department created' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //function to get all departments
  getDept = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await adminService.getDept();
      if (documents) {
        res.status(200).send(documents);
      } else {
        throw new NotFoundError('No documents found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //update department name
  updateDept = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const dept = req.body as IDept;
      if (!id || !dept) {
        throw new BadRequestError('Invalid request');
      } else {
        await adminService.updateDept(id, dept.dept_name);
        res.status(200).json({ success: 'Department updated' });
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get count of documents
  getCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const model = req.params.model;
      if (!model) {
        throw new BadRequestError('Invalid request');
      }
      const doc = await adminService.getCount(model);
      const count = doc?.toString();
      res.status(200).send(count);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  patientsPerDept = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await bookingService.getSlotsPerDept();
      if (documents) {
        res.status(200).send(documents);
      } else {
        throw new NotFoundError('No documents found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };
}
