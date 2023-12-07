import { NextFunction, Request, Response } from 'express';

export interface IDoctorController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDoctors(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
  blockDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
  unblockDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
  getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  makeSlot(req: Request, res: Response, next: NextFunction): Promise<void>;
}
