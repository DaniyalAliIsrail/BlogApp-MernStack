import express from 'express'
import {verifyToken}  from '../utils/verifyUser.js';
import { create,  deletePost,  getPost ,updatePost ,getALLPost } from '../controller/post.Controller.js';
const router = express.Router();

router.post("/create",verifyToken,create)
router.get("/getpost",getPost);
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost)
router.put("/updatepost/:postId/:userId",verifyToken,updatePost)
router.put("/getAllPost",verifyToken,getALLPost) 

// getAllPost
export default router