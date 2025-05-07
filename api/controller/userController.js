import User from "../Model/userModel.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "route api working",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(401, "Unauthorized user"));
    }
    // Validate Username (move outside the password block)
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );
      }

      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username must not contain spaces"));
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be in lowercase"));
      }

      if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
        return next(
          errorHandler(
            400,
            "Username must only contain alphanumeric characters"
          )
        );
      }
    }

    // Validate and Hash Password
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters long")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Check if the user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...userWithOutPassword } = updatedUser._doc;
    res.status(200).json(userWithOutPassword);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("Delete user ID:", req.params.userId);//wo id js user ko deete krna hay
  console.log("Current user ID:", req.user.id); // admin k user id 
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    
    return next(errorHandler(403, "you are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.error("Delete error:", error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token",{httpOnly: true})
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUsers = async(req,res,next)=>{
  if(!req.user.isAdmin || !req.user.id == req.params.userId){
    return next(errorHandler(403,"you are not allowed to access this route"))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
    .sort({createdAt:sortDirection})
    .skip(startIndex)
    .limit(limit)
    // user return array of object with passoword but i want to remove this password from the object
    const userWithOutPassword = users.map((user)=>{
      const {password,...objWithOutPassword} = user._doc
      return objWithOutPassword
    })
    //total number of Users
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() -1,
      now.getDate()
    )
    // last month uers show
    const lastMothUsers = await User.countDocuments({
      createdAt:{
        $gte:oneMonthAgo
      }
    })
  

    res.status(200).json({
      users:userWithOutPassword,
      totalUsers:totalUsers,
      lastMothUsers:lastMothUsers,

    })
  } catch (error) {
    next(error)
  }
}