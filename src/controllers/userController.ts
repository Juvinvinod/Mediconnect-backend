import { Request, Response } from 'express';

import { UserRepository } from '../routes/userRoutes';
import { UserDoc } from '../models/userModel';

const userRepository = new UserRepository();

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, password, mobile } = req.body;
      const userDetails: UserDoc = {
        first_name,
        last_name,
        email,
        password,
        mobile,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
