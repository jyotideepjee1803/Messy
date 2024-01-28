import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { couponPurchase, couponValidity } from "../controller/couponController.js";
import { getMealData, getWeekMenu } from "../controller/dataController.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);
router.get("/getmenu" , getWeekMenu);
router.get("/getmeal" , getMealData);
router.post("/buyCoupon", couponPurchase);
router.post("/validCoupon",couponValidity);

export default router;