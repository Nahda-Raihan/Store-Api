require('dotenv').config();
const express=require("express");
const app=express();
const port=5000;

const connectDb=require('./DB/Connect');
const Product=require('./Models/products');
const jsonProduct=require('./products.json');
console.log(Product)

const start=async()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        app.listen(port,console.log(`server listen at port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}
start();