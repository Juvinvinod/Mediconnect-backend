import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../common/errors/badRequestError';
import { ForbiddenError } from '../common/errors/forbiddenError';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    throw new BadRequestError('No token found');
  }
  const token = bearerHeader.split(' ')[1];
  if (token === null) {
    throw new BadRequestError('Unauthorized request');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new ForbiddenError('Unauthorized request');
      }
      if (typeof user === 'string') {
        throw new ForbiddenError('Unauthorized request');
      }
      (req.body as { _id: string })._id = user?.subject as string;
      next();
    });
  } catch (err) {
    throw new BadRequestError('Unauthorized request');
  }
};
