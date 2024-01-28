import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);

export default router;