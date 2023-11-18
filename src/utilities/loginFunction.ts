import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserService } from '../services/userService';
import { StaffService } from '../services/staffService';
import { DoctorService } from '../services/doctorService';
import { BadRequestError } from '../common/errors/badRequestError';

//login function which checks database based on the role and service provided
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
  service: UserService | StaffService | DoctorService,
  role: string
): Promise<void> => {
  try {
    interface LoginData {
      email: string;
      password: string;
    }

    const { email, password } = req.body as LoginData;

    const user = await service.login(email);
    if (user.is_blocked) {
      throw new BadRequestError(role + ' is blocked');
    }
    if (user && user.role === role) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const payload = { subject: user._id };
        const role = user.role;
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).send({ token, role });
      } else {
        throw new BadRequestError('Incorrect ' + role + ' name/password');
      }
    } else {
      throw new BadRequestError('Incorrect ' + role + ' name/password');
    }
  } catch (error) {
    if (error instanceof Error) {
      return next(error);
    }
  }
};
