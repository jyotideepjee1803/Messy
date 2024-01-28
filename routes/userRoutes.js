import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/userController.js";
import { getMealData, getWeekMenu } from "../controller/dataController.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",authenticateUser);



//getmenu 
router.get("/getmenu" , getWeekMenu);
//getmeal
router.get("/getmeal" , getMealData);

export default router;