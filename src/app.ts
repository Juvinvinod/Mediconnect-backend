import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import doctorRouter from './routes/doctorRoutes';
import staffRouter from './routes/staffRoutes';
import chatRouter from './routes/chatRoutes';
import { errorHandler } from './middlewares/globalErrorHandler';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'https://mediconnect-frontend.vercel.app',
      'https://mediconnect.juvin.in',
    ],
    allowedHeaders: ['Authorization', 'Content-Type'],
  },
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('setup', async function (userId: string) {
    const room = userId;
    await socket.join(userId);
    console.log('joined room');
    socket.on('chat', function (data) {
      io.to(room).emit('chat', data);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
});

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4200',
  'https://mediconnect-frontend.vercel.app',
  'https://mediconnect.juvin.in',
  'https://mediconnect.juvin.in/',
  'mediconnect-frontend.vercel.app',
  'http://mediconnect-frontend.vercel.app',
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: '*',
};

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(options));
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/staff', staffRouter);
app.use('/chat', chatRouter);
app.use(userRouter);
app.use(errorHandler);

export { httpServer };
