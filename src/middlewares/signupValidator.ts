import { body } from 'express-validator';

export const signupValidator = [
  body('first_name')
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage('First name must contain only letters')
    .not()
    .isEmpty()
    .withMessage('Field cannot be Empty'),
  body('last_name')
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage('last name must contain only letters')
    .not()
    .isEmpty()
    .withMessage('Field cannot be Empty'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage('password length must be between 4 & 10')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .withMessage('Password must contain both letters and numbers'),
  body('email').trim().isEmail().withMessage('Enter valid email'),
  body('mobile')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Enter valid 10-digit mobile number'),
];
