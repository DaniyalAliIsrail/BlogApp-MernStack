import User from "../Model/userModel.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/error.js";


const signup = async (req,res,next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
   return next(errorHandler(400, 'All field are required'));
  }
  
  try{
   
    const hashPassword = bcryptjs.hashSync(password,10)
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const newUser = await user.save();
    return res.json({
      message: "User created successfully",
      user:newUser,
    })
  }catch(error){ 
    //next(error) is a middlewear to check error
    next(error); 
  }
};
export default signup;
