import asyncHandler from "express-async-handler";
import UserModel from "../models/user.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter All the User Fields");
    }
  
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const newUserDetails = { name, email, password, isAdmin};
  
    const createdUser = await UserModel.create(newUserDetails);
  
    if (!createdUser) {
      res.status(404);
      throw new Error("User Not Found");
    }
  
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser._id),
      /* Expire session after 15 days */
      expiryTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
    });
});

const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("Invalid request params for user login");
    }
  
    // Find a user with the entered email
    const user = await UserModel.findOne({ email });
    // Check if a user with entered email exists and check if entered password
    // matches the stored user password
    if (user && (await user.matchPasswords(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin : user.isAdmin,
        token: generateToken(user._id),
        /* Expire session after 15 days */
        expiryTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
});
  
export {registerUser, authenticateUser};