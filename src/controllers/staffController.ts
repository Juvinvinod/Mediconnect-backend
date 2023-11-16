import { NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { BadRequestError } from '../common/errors/badRequestError';
import { StaffService } from '../services/staffService';
import { IStaff } from '../common/types/staff';

const staffService = new StaffService(); // create an instance of userService

export class StaffController {
  //check if a user already exists else create new user
  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const staffDetails = matchedData(req) as IStaff;
      const hashedPass = await bcrypt.hash(staffDetails.password, 10);
      staffDetails.password = hashedPass;
      await staffService.signup(staffDetails);
      res.status(200).json({ message: 'Staff created' });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      } else {
        console.log('An error occurred');
      }
    }
  };

  // function to check whether user exists,if so then provide them with token
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
      const staff = await staffService.login(email);

      if (staff) {
        const validPassword = await bcrypt.compare(password, staff.password);
        if (validPassword) {
          const payload = { subject: staff._id };
          const role = staff.role;
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

  // retrieve all staffs from database
  getStaffs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await staffService.getStaffs();
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  // retrieve staff from database
  getStaff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = (req.body as { _id?: string })?._id;
      if (id) {
        const document = await staffService.getStaff(id);
        if (document) {
          res.status(200).send(...document);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  //update staff
  updateStaff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;

      const staff = req.body as IStaff;

      await staffService.UpdateStaff(id, staff);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //block staff
  blockStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await staffService.blockStaff(id);
      res.status(200).json({ success: 'Doctor blocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //unblock staff
  unblockStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await staffService.unblockStaff(id);
      res.status(200).json({ success: 'Doctor unblocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //update staff password
  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = (req.body as { _id?: string })?._id;
      const oldPass = (req.body as { password?: string }).password;
      const newPass = (req.body as { confirm_password?: string })
        .confirm_password;
      if (id) {
        const document = await staffService.getStaff(id);
        if (document && oldPass) {
          const passCheck = await bcrypt.compare(oldPass, document[0].password);
          if (passCheck && newPass) {
            const hashedPass = await bcrypt.hash(newPass, 10);
            await staffService.updatePassword(id, hashedPass);
            res.status(200).json({ success: 'Password updated' });
          } else {
            throw new BadRequestError('Incorrect Password');
          }
        } else {
          throw new BadRequestError('Document not found');
        }
      } else {
        throw new BadRequestError('Invalid id');
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };
}
