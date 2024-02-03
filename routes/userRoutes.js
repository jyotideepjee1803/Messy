import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { couponPurchase, couponValidity } from "../controller/couponController.js";
import { getCouponData, getMealData, getWeekMenu } from "../controller/dataController.js";
import { protect } from "../middleware/authMiddleware.js";
import { payment , verify} from "../controller/payment.js";


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


export default router;