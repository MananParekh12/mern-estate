import express from 'express';
import mongoose from 'mongoose';
const mongo="mongodb+srv://Manan:Manan@mern-estate.iuodf6i.mongodb.net/mern-estate?retryWrites=true&w=majority&appName=mern-estate"
import userRouter from './routes/user.route.js';

mongoose
  .connect(mongo)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
}
);


app.use('/api/user', userRouter);
