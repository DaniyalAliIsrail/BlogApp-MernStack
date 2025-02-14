import jwt from 'jsonwebtoken';
import errorHandler from '../utils/error.js';

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    console.log(token)
    if(!token){
        return next(errorHandler(401,"unauthorized user"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error){
            return next(errorHandler(401,'Unauthorized '))
        }
        //jo token banaty wqt hm paylaod data bhjty hay wo yaha mlta hay may nay userId or isAdmin ye bhja hay
        req.user = user;
        console.log("req_User",req.user)
        next();
    })
}