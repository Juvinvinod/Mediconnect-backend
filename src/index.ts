import DbConnection from './config/db-connection';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
DbConnection.connect(process.env.DATABASE_URL).catch((error) =>
  console.log(error)
);

app.listen(process.env.PORT, () =>
  console.log(`Connected to port ${process.env.PORT}`)
);
