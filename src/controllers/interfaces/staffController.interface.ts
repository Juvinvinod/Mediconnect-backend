import { NextFunction, Request, Response } from 'express';

export interface IStaffController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStaffs(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStaff(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateStaff(req: Request, res: Response, next: NextFunction): Promise<void>;
  blockStaff(req: Request, res: Response, next: NextFunction): Promise<void>;
  unblockStaff(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
