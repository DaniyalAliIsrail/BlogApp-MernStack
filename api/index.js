import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

import dotenv from 'dotenv'
dotenv.config();

const app = express(); 
const PORT = 3000;


app.use(express.json()) // client say any wala json data automatic parse krta hay or javascript obj may convert krta hay

// middleware for user routes
app.use('/api/user',userRoutes)
 // middleware for auth routes
app.use('/api/auth',authRoutes)
// error handling middleware
app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'internal server Error';
    res.status(statuscode).json({
        success: false,
        statuscode,
        message

    })
})
 
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DATABASE CONNECTED");
}).catch((err)=>{
    (console.log("error",err));
})

app.listen(PORT,()=>{
    console.log(`server is running on post ${PORT}`);
});
