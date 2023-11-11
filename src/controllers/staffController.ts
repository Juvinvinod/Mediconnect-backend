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
}
