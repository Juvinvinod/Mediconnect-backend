import { CustomError } from './customError';
import { ValidationError } from 'express-validator';

// create an error handler for handling errors produced by express-validator
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map(
      (err: { type: string; msg: string; path?: string }) => {
        if (err.type === 'field') {
          return { message: err.msg, field: err.path };
        }
        return { message: err.msg };
      }
    );
  }
}
