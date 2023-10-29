import express from 'express';

import userRouter from './routes/userRoutes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);

export { app };
