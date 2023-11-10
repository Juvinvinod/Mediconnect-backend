import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import { errorHandler } from './middlewares/globalErrorHandler';

const app = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// middlewares
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/admin', adminRouter);
app.use(userRouter);
app.use(errorHandler);

export { app };
