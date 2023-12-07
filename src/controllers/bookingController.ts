import { NextFunction, Request, Response } from 'express';

import { BookingService } from '../services/bookingService';
import { NotFoundError } from '../common/errors/notFoundError';
import { IBookingController } from './interfaces/bookingController.interface';

const bookingService = new BookingService();

export class BookingController implements IBookingController {
  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id;
    const documents = await bookingService.getSlots(id);
    try {
      if (documents) {
        res.status(200).send(documents);
      } else {
        throw new NotFoundError('Document not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  bookSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
  getBookingDocs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _id = req.body as string;
      const documents = await bookingService.getBookings(_id);
      if (documents) {
        res.status(200).send(documents);
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
  ): Promise<void> => {
    try {
      const _id = req.body as string;
      const documents = await bookingService.getDocBookings(_id);
      if (documents) {
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //update slots
  updateSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body as {
        user_id: string;
        status: string;
        prescription: string;
      };
      const id = body.user_id;
      const status = body.status;
      const prescription = body.prescription;
      const documents = await bookingService.updateSlots(
        id,
        status,
        prescription
      );
      if (documents) {
        res.status(200).json({ success: 'document updated' });
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  createdDocSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = (req.body as { _id?: string })?._id;
      if (id) {
        const documents = await bookingService.getDocSlots(id);
        res.status(200).send(documents);
      } else {
        throw new NotFoundError('id not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  deleteSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const start_time = req.params.time;
      await bookingService.deleteSlot(start_time);
      res.status(200).json({ success: 'Slot cancelled' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  getAllBookedSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const documents = await bookingService.getAllSlots();
      res.status(200).send(documents);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  getSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const document = await bookingService.getSlot(id);
      if (document) {
        res.status(200).send(document);
      } else {
        throw new NotFoundError('document not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  cancelSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body as { id: string };
      console.log(body);

      await bookingService.cancelSlot(body.id);
      res.status(200).json({ success: 'Slot cancelled' });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };
}
