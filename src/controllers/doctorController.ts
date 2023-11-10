import { NextFunction, Request, Response } from 'express';
import { DoctorService } from '../services/doctorService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../common/errors/badRequestError';
import { IDoctor } from '../common/types/doctor';
import { matchedData } from 'express-validator/src/matched-data';

const doctorService = new DoctorService();

export class DoctorController {
  //check if a doctor already exists else create a new doctor
  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const doctorDetails = matchedData(req) as IDoctor;
      const hashedPass = await bcrypt.hash(doctorDetails.password, 10);
      doctorDetails.password = hashedPass;
      await doctorService.signup(doctorDetails);
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

  //login details verification
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
      const doctor = await doctorService.login(email);

      if (doctor) {
        const validPassword = await bcrypt.compare(password, doctor.password);
        if (validPassword) {
          const payload = { subject: doctor._id };
          const role = doctor.role;
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

  // retrieve all doctors from database
  getDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await doctorService.getDoctors();
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };
}
