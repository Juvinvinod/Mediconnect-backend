import { NextFunction, Request, Response } from 'express';

export interface IChatController {
  accessChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserChats(req: Request, res: Response, next: NextFunction): Promise<void>;
  createMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMessages(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDocChats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
