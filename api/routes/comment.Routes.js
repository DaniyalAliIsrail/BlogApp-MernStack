import express from "express"
import { createComment, deleteComment, getComment, likeComment, updateComment } from "../controller/commentController.js" 
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.post("/postcomment/:userId",verifyToken, createComment)
router.get("/getpostcomment/:postId",verifyToken, getComment)
router.put("/likeComment/:commentId",verifyToken,likeComment)
router.put("/commentupdate/:commentId",verifyToken,updateComment)
router.delete("/commentdelete/:commentId",verifyToken,deleteComment)

export default router