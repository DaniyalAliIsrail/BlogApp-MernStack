import User from "../Model/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All field are required"));
  }
  try {
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const newUser = await user.save();
    return res.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    //next(error) is a middlewear to check error
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All field are required"));
  }

  try {
    //const validUser = await User.findOne({ email }).select('-password');

    // Is approach se, jab aap database se user data fetch karte ho, tabhi password field ko exclude kar dete ho. Iske baad aapko manually password ko remove karne ki zaroorat nahi padti.

    const validUser = await User.findOne({ email });
    console.log("validUser_signin",validUser)

    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id , isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
    const { password: pass, ...userWithoutPassword } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    return next(error);
  }
};

const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("run ifffffff part");
      const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...userWithoutPassword } = user._doc; // Corrected
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    } else {
      console.log("run else else part");

      const genratedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(genratedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
      const { password, ...userWithoutPassword } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    }
  } catch (error) {
    console.error("Error in Google Sign-in:", error);
    next(error);
  }
};

export { signup, signin, google };
