import Post from "../Model/post.model.js";
import errorHandler from "../utils/error.js";

const create = async (req, res, next) => {

  const { title, content, category } = req.body;
  const { id, isAdmin } = req.user;

  if (!isAdmin) {
    return next(errorHandler(403, "Can Not access to create post"));
  }
  if (!title || !content) {
    return next(errorHandler(400, "please required all fields"));
  }
  //jo bhy special char or extraspace hoga to - s replace hojae ga title m stf..
  const slug = title
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9]/g, "-");

  const newPost = new Post({
    title,
    content,
    category,
    slug,
    userId: id,
  });
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};
const getPost = async (req,res,next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPost = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      posts,
      lastMonthPost,
      totalPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// const deletePost =async (req,res,next)=>{
//   if(!req.user.isAdmin || req.user.id !== req.params.userId){
//     return next(errorHandler(403,"You are not allowed to delete this post"))
//   }
//   try {
//     await Post.findByIdAndDelete(req.params.PostId);
//     res.status(200).json("The post has been delted")
//   } catch (error) {
//     console.log("delte catch error",error)
//     next(error)
//   }
// }

const deletePost = async (req, res, next) => {
  try {
    // Fix parameter names to match URL structure
    const postId = req.params.postId || req.params.PostId; // First parameter in URL
    const userId = req.params.userId; // Second parameter in URL
    
    // Check if user is authenticated
    if (!req.user) {
      return next(errorHandler(401, "Authentication required"));
    }

    // Verify user has permission
    if (!req.user.isAdmin && req.user.id !== userId) {
      return next(errorHandler(403, "You are not allowed to delete this post"));
    }

    // Find the post first to verify it exists and belongs to user
    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    
    // Verify post belongs to user
    if (post.userId !== userId && !req.user.isAdmin) {
      return next(errorHandler(403, "You can only delete your own posts"));
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);
    
    res.status(200).json({ success: true, message: "The post has been deleted" });
  } catch (error) {
    console.error("Delete API Error:", error);
    next(error);
  }
};
const updatePost = async(req,res,next)=>{

 if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  return next(errorHandler(403, "You are not allowed to update this post"));
}
try {
  const updatePost = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set:{
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
      }
    },
    { new: true }
  );
  res.status(200).json(updatePost);
} catch (error) {
  next(error); 
}

}
// show all post of all user 
const getALLPost = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get All Posts API Error:", error);
    next(error);
  }
}

export {create, getPost,deletePost,updatePost,getALLPost};

























