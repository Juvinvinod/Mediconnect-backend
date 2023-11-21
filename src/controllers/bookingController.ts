import { NextFunction, Request, Response } from 'express';
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
}
