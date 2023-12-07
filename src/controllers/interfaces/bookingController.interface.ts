import { NextFunction, Request, Response } from 'express';

export interface IBookingController {
  getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  bookSlot(req: Request, res: Response, next: NextFunction): Promise<void>;
  getBookingDocs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getDoctorBookingDocs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateSlots(req: Request, res: Response, next: NextFunction): Promise<void>;
  createdDocSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteSlot(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllBookedSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getSlot(req: Request, res: Response, next: NextFunction): Promise<void>;
  cancelSlot(req: Request, res: Response, next: NextFunction): Promise<void>;
}
