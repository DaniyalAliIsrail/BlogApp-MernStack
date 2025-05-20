import Comment from "../Model/comment.model.js";
import errorHandler from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body; // Extract data from request body
    if (!userId || !content || !postId) {
      return next(errorHandler(400, "Missing required fields"));
    }
    console.log("req.params.userId==>", req.params.userId);
    console.log("userId==>", userId);

    if (userId !== req.params.userId) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }
    const newComment = new Comment({
      content,
      userId,
      postId,
      likes: [],
      numberOfLikes: 0,
    });
    await newComment.save();
    return res.status(200).json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      comments: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    // req.params.commentId se comment ka ID milta hai
    // ➤ URL se jo ID aayi hai uss se database mein comment dhundtay hain.
    const comment = await Comment.findById(req.params.commentId);
    console.log("comment return document", comment);
    //Comment database se milta hai ya nahi?
    // ➤ Agar nahi milta to 404 error bhej detay hain: "Comment not found".
    if (!comment) return next(errorHandler(404, "Comment not found"));
    // userindex k code ko smjhnay k lye coment keya hay
    // check k user.id array m hay ya nhy agr nhy h to userindex -1 retutn kry g a or agr hay to arry ka index return kry ga ja pr user.id mojood hay
    // for example const arr = ["user1", "user2", "user3"];
    // const index = arr.indexOf("user3");
    // console.log(index); // Output: 2
    const userIndex = comment.likes.indexOf(req.user.id);
    console.log("userIndex==>", req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "commment no found"));
    }
    if ((comment.userId != req.user.id) && !req.user.isAdmin) {
      return next(
        errorHandler(403, "you are not allowed to edit this comment")
      );
    }
    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async(req,res,next)=>{
try {
  const comment = await Comment.findById(req.params.commentId)
  if(!comment){
    return next(errorHandler(404,"comment not found"))
  }
  if((comment.userId !== req.user.id) && !req.user.isAdmin){
      errorHandler(403, "you are not allowed to delete this comment")
  }
  await Comment.findByIdAndDelete(req.params.commentId)
  res.status(200).json("comment has been delete")
} catch (error) {
  next(error)
}
}
