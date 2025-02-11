import express from 'express'
import {verifyToken}  from '../utils/verifyUser.js';
import postController from '../controller/post.controller.js';
const router = express.Router();

router.post("/create",verifyToken,postController)
export default  router