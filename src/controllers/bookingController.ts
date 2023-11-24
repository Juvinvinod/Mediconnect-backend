import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

import { BookingService } from '../services/bookingService';
import { NotFoundError } from '../common/errors/notFoundError';

const bookingService = new BookingService();

export class BookingController {
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const documents = await bookingService.getSlots(id);
    try {
      if (documents) {
        return res.status(200).send(documents);
      } else {
        throw new NotFoundError('Document not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  bookSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as {
        booking_id: string;
        _id: string;
        time: string;
        doctorId: string;
        payId: string;
      };
      console.log(body);
      const bookingId = body.booking_id;
      const userId = body._id;
      const doctorId = body.doctorId;
      const payId = body.payId;

      // const dateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm A')
      //   .utc()
      //   .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      // const formattedDate = moment(date)
      //   .utc()
      //   .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      await bookingService.bookSlot(doctorId, userId, bookingId, payId);
      res.status(200).json({ success: 'Slot booked' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get all user booking docs
  getBookingDocs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id = req.body as string;
      const documents = await bookingService.getBookings(_id);
      if (documents) {
        return res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get all user booking docs
  getDoctorBookingDocs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const _id = req.body as string;
      const documents = await bookingService.getDocBookings(_id);
      if (documents) {
        return res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };
}
