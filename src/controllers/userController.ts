import { NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/userRepository';
import { IUser } from '../common/types/user';
import { UserService } from '../services/userService';
import { BadRequestError } from '../common/errors/badRequestError';

const userRepository = new UserRepository(); // create an instance of userRepository
const userService = new UserService(userRepository); // create an instance of userService and pass in the userRepository

export class UserController {
  //check if a user already exists else create new user
  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userDetails = matchedData(req) as IUser;
      const hashedPass = await bcrypt.hash(userDetails.password, 10);
      userDetails.password = hashedPass;
      await userService.signup(userDetails);
      res.status(200).json({ message: 'User created' });
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
      const user = await userService.login(email);

      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const payload = { subject: user._id };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).send({ token });
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
