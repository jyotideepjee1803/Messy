import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { couponValidity } from "../controller/couponController.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);
router.post("/validCoupon",couponValidity);

export default router;