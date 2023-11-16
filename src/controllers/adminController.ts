import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../common/errors/badRequestError';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AdminService } from '../services/adminService';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';

const adminService = new AdminService(); // create an instance of adminService
const userService = new UserService(); // create an instance of userService

export class AdminController {
  // function to check whether user is an admin,if so then provide them with token
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      interface LoginData {
        email: string;
        password: string;
      }

      const { email, password } = req.body as LoginData;
      const user = await userService.login(email);

      if (user && user.role === 'admin') {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const payload = { subject: user._id };
          const role = user.role;
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).send({ token, role });
        } else {
          throw new BadRequestError('Incorrect username/password');
        }
      } else {
        throw new BadRequestError('Incorrect username/password');
      }
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
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const document = await adminService.getUser(id);
    try {
      if (document) {
        return res.status(200).send(document);
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
  blockUser = async (req: Request, res: Response, next: NextFunction) => {
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
  unblockUser = async (req: Request, res: Response, next: NextFunction) => {
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
}
