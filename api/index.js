import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = 3000;
 
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DATABASE CONNECTED");
}).catch((err)=>{
    console.log("error",err);
})

app.listen(PORT,()=>{
    console.log(`server is running on post ${PORT}`);
})