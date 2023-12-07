import { NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import bcrypt from 'bcrypt';

import { IUser } from '../common/types/user';
import { UserService } from '../services/userService';
import { BadRequestError } from '../common/errors/badRequestError';
import { login } from '../utilities/loginFunction';
import { IUserController } from './interfaces/userController.interface';
// import Razorpay from 'razorpay';

const userService = new UserService(); // create an instance of userService

export class UserController implements IUserController {
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
      await login(req, res, next, userService, 'user');
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  // retrieve user from database
  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = (req.body as { _id?: string })?._id;
      if (id) {
        const document = await userService.getUser(id);
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

  //update existing password of user
  updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = (req.body as { _id?: string })?._id;
      const oldPass = (req.body as { password?: string }).password;
      const newPass = (req.body as { confirm_password?: string })
        .confirm_password;
      if (id) {
        const document = await userService.getUser(id);
        if (document && oldPass) {
          const passCheck = await bcrypt.compare(oldPass, document[0].password);
          if (passCheck && newPass) {
            const hashedPass = await bcrypt.hash(newPass, 10);
            await userService.updatePassword(id, hashedPass);
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

  getAllSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await userService.getSLots();
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  // createPayment = async (req: Request, res: Response, next: NextFunction) =>{
  //   try {
  //     const razorpay = new Razorpay({
  //       key_id: process.env.RAZORPAY_KEY,
  //       key_secret: process.env.RAZORPAY_SECRET,
  //     });
  //   } catch (error) {

  //   }
  // }
}
