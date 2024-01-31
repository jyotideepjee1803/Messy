import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { couponPurchase, couponValidity } from "../controller/couponController.js";
import { getMealData, getWeekMenu } from "../controller/dataController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);
router.get("/getmenu" , protect ,  getWeekMenu);
router.get("/getmeal" , protect, getMealData);
router.post("/buyCoupon", protect, couponPurchase);
router.post("/validCoupon", protect, couponValidity);

export default router;