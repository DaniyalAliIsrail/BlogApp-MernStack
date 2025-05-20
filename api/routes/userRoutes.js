import express from "express";
import { test,updateUser ,deleteUser,getUsers,signout, getUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();
router.get('/test',test);
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signout)
router.get("/getusers",verifyToken,getUsers)
router.get("/getuser/:userId",getUser)
export default router;