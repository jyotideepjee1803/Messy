import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { couponPurchase, couponValidity } from "../controller/couponController.js";
import { getCouponData, getMealData, getWeekMenu } from "../controller/dataController.js";
import { protect } from "../middleware/authMiddleware.js";
import { initiatePayment, paymentStatus } from "../controller/paymentController.js";


const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);
router.get("/getmenu" , protect ,  getWeekMenu);
router.get("/getmeal" , protect, getMealData);
router.post("/getcoupon", protect, getCouponData);
router.post("/buyCoupon", protect, couponPurchase);
router.post("/validCoupon", protect, couponValidity);
router.post("/pay", protect, payment);
router.post("/pay/success", protect, verify);


router.post("/initiatePayment",protect, initiatePayment);
router.post("/paymentStatus", protect, paymentStatus);
export default router;