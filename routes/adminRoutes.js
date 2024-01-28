import { Router } from "express";
import { setMealCostTime, setMenu } from "../controller/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

//setmenu 
router.post("/setmenu" , protect , setMenu);
router.post("/setmeal" , protect , setMealCostTime);
//setmeal

export default router;