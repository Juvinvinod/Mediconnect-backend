import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment';

import { DoctorService } from '../services/doctorService';
import { login } from '../utilities/loginFunction';
import { BadRequestError } from '../common/errors/badRequestError';
import { IDoctor } from '../common/types/doctor';
import { matchedData } from 'express-validator/src/matched-data';
import { IBooking } from '../common/types/booking';

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
      await login(req, res, next, doctorService, 'doctor');
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

  //update user
  updateDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;

      const doctor = req.body as IDoctor;

      await doctorService.UpdateDoctor(id, doctor);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //block doctor
  blockDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await doctorService.blockDoctor(id);
      res.status(200).json({ success: 'Doctor blocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //unblock doctor
  unblockDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body as { id: string };
      if (!id) {
        throw new BadRequestError('Invalid request');
      }
      await doctorService.unblockDoctor(id);
      res.status(200).json({ success: 'Doctor unblocked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get doctor profile
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = (req.body as { _id?: string })?._id;
      if (id) {
        const documents = await doctorService.getDoctor(id);
        if (documents) {
          res.status(200).send(...documents);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  };

  //get doctor document
  getDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (id) {
        const document = await doctorService.getDoctor(id);
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

  //update doctor password
  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = (req.body as { _id?: string })?._id;
      const oldPass = (req.body as { password?: string }).password;
      const newPass = (req.body as { confirm_password?: string })
        .confirm_password;
      if (id) {
        const document = await doctorService.getDoctor(id);
        if (document && oldPass) {
          const passCheck = await bcrypt.compare(oldPass, document[0].password);
          if (passCheck && newPass) {
            const hashedPass = await bcrypt.hash(newPass, 10);
            await doctorService.updatePassword(id, hashedPass);
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

  makeSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const formDetails = req.body as IBooking;
      const { start_time, end_time } = formDetails;
      const startMoment = moment(start_time, 'HH:mm');
      const endMoment = moment(end_time, 'HH:mm');
      // Initialize an array to store the time range entries
      // Loop to add 15 minutes to the start time until it reaches or exceeds the end time
      // Create a copy of formDetails to avoid modifying the original object in the loop
      const currentFormDetails = { ...formDetails };
      currentFormDetails.doctor_id = (req.body as { _id?: string })?._id;
      currentFormDetails._id = undefined;

      // Loop to add 15 minutes to the start time until it reaches or exceeds the end time
      while (startMoment.isBefore(endMoment)) {
        // Update the start time in the currentFormDetails
        currentFormDetails.start_time = startMoment.format();
        currentFormDetails.end_time = startMoment.add(15, 'minutes').format();
        // Create a new slot with the currentFormDetails
        console.log(currentFormDetails);

        await doctorService.createSlot(currentFormDetails);

        // Add 15 minutes to the start time
        // startMoment.add(15, 'minutes');
      }

      res.status(201).json({ success: 'Slots created successfully' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };
}
