// modify the existing inbuilt error handling
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors():
    | { message: string; field?: string }
    | { message: string; field?: string }[];
}
