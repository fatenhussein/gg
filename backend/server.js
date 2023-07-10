import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import DesignersRouter from './routes/DesignersRoutes.js';
//function is called to load environment variables 
dotenv.config();

//connect to the MongoDB database 
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

//function is used to create an Express application,
const app = express();
//parse JSON data in the request body 
app.use(express.json());
//parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

//sets up various routes for different functionalities 
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

app.use('/api/designers', DesignersRouter);

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
//function that catches any errors thrown during request processing
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
