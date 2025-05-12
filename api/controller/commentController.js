
import Comment from "../Model/comment.model.js";
import errorHandler from "../utils/error.js";

export const createComment = async(req, res, next) => {
  try {
    const { content, postId, userId } = req.body; // Extract data from request body
    if (!userId || !content || !postId) {
      return next(errorHandler(400, "Missing required fields"));
    }
    console.log("req.params.userId==>",req.params.userId)
    console.log("userId==>",userId)

    if (userId !== req.params.userId) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }
    const newComment = new Comment({
      content,
      userId,
      postId,
      likes:[],
      numberOfLikes:0
    });
    await newComment.save();
    return res.status(200).json({
      success: true,
      comment: newComment
    });
   
  } catch (error) {
    next(error);
  }
};