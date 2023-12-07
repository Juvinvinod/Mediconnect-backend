import { NextFunction, Request, Response } from 'express';

export interface IAdminController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStaffs(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  blockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  unblockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  createDept(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDept(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateDept(req: Request, res: Response, next: NextFunction): Promise<void>;
  getCount(req: Request, res: Response, next: NextFunction): Promise<void>;
  patientsPerDept(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
