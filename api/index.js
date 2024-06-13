import express from 'express';
import mongoose from 'mongoose';
const mongo="mongodb+srv://Manan:Manan@mern-estate.iuodf6i.mongodb.net/mern-estate?retryWrites=true&w=majority&appName=mern-estate"
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

mongoose
  .connect(mongo)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
}
);


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});