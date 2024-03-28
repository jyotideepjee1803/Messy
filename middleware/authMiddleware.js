import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

export const protect = asyncHandler (async(req ,res,next) => {
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
              }

              next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
});


export const adminCheck = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.isAdmin == false) {
      res.status(401);
      throw new Error("Authorized only for admin");
    }
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});