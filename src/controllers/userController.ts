import { NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';

import { UserRepository } from '../repositories/userRepository';
import { IUser } from '../common/types/user';
import { UserService } from '../services/userService';

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
}
