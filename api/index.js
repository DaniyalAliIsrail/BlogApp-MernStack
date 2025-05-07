import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/post.Routes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express(); 
const PORT = 4000;
app.use(cors({
    origin: "http://localhost:5173", // ✅ Allow frontend requests
    credentials: true, // ✅ Allow cookies if needed
}));

app.use(express.json()) // client say any wala json data automatic parse krta hay or javascript obj may convert krta hay

app.use(cookieParser()) // middleware for cookie parsing
// middleware for user routes
app.use('/api/user',userRoutes)
 // middleware for auth routes
app.use('/api/auth',authRoutes)
// post create routes
app.use('/api/post',postRoutes)

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
