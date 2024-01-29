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
            // console.log(decoded);

            req.user = await User.findById(decoded.id).select("-password");
             //console.log(req.user);
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


export const adminCheck = async (req, res, next) => {
    try {
    //   const {user} = req.user;
    //   console.log(req.user);
      if (req.user.isAdmin == false) {
        res.status(401).json({ error: 'Permission denied' });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Internal Server Error' });
    }
  };