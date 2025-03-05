import express from 'express'
import {verifyToken}  from '../utils/verifyUser.js';
import { create,  getPost } from '../controller/post.Controller.js';
const router = express.Router();

router.post("/create",verifyToken,create)
router.get("/getpost",getPost);
export default router