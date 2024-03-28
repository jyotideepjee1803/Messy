import asyncHandler from "express-async-handler";
import UserModel from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/email/sendMail.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
const clientURL = process.env.CLIENT_URL;
import { resetTemplate } from "../utils/email/template/resetPassword.js";
import { Resend } from "resend";

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

const requestPasswordReset = asyncHandler(async(req,res)=>{
  const {email} = req.body;
  const user = await UserModel.findOne({email});

  const resend = new Resend(process.env.RESEND_KEY);

  if(!user){
    res.status(401);
    throw new Error("User doesn't exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = generateToken(user._id);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(resetToken, Number(salt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}new-password?token=${resetToken}&id=${user._id}`;
  // sendEmail(
  //   user.email,
  //   'Password Reset Request',
  //   {
  //     name : user.name,
  //     link,
  //   },
  //   resetTemplate(user.name,link)
  // );
  try{
  const data = await resend.emails.send({
    from: 'MessAdmin@resend.dev',
    to: user.email,
    subject: 'Password Reset Request',
    html: resetTemplate(user.name,link)
  });
  console.log(data);
  }catch(error){
    console.log(error);
  }
  return res.json({link});
});

const resetPassword = asyncHandler(async(req,res)=>{
  const {userId, token, password} = req.body;
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    res.status(401);
    throw new Error("Invalid or expired password reset token");
  }

  // console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    res.status(401);
    throw new Error("Invalid or expired password reset token");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, Number(salt));

  await UserModel.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await UserModel.findById({ _id: userId });

  await passwordResetToken.deleteOne();
  return res.status(200).json({ message: "Password reset was successful" });
});
  
export {registerUser, authenticateUser, requestPasswordReset, resetPassword};