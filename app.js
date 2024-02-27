const express = require("express");
require("express-async-errors")
const app = express();
const connectDB = require("./DB/Connect");


const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/error-handler");
app.use(express.json());
require("dotenv").config();

const Product_Routes=require('./Routes/products')
app.use('/api/products',Product_Routes);
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Connected to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
