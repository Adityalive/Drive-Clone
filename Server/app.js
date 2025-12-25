import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/User.js';
import dbconnect from './db/dbconnect.js';
const app = express();
const PORT = 3000;

dbconnect();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/user', userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});