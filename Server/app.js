import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/User.js';
import dbconnect from './config/dbconnect.js';
import fileRouter from './routes/Upload.route.js';
import shareRouter from './routes/Share.route.js';
const app = express();
const PORT = 3000;

dbconnect();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/users', userRouter);
app.use('/api/files', fileRouter);
app.use('/share', shareRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
