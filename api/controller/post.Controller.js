import Post from "../Model/post.model.js";
import errorHandler from "../utils/error.js";

const create = async (req, res, next) => {
  // console.log("daniya",req.user.id);
  const { title, content,category,image } = req.body;
  const {id} = req.user

  if (!req.user.isAdmin) {
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

 const newPost = new  Post({
    title,
    content,
    category,
    image,
    slug,
    userId: id
  });
 try {
  const savePost = await newPost.save();
  res.status(201).json(savePost);
 } catch (error) {
  next(error)
 }
};

export default create;
