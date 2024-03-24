import { Router } from "express";
import { setMealCostTime, setMenu } from "../controller/adminController.js";
import { adminCheck, protect } from "../middleware/authMiddleware.js";
import { totalMealCount } from "../controller/couponController.js";

const router = Router();

router.post("/setmenu" , protect, adminCheck , setMenu);
router.post("/setmeal" , protect, adminCheck , setMealCostTime);
router.get("/totalmeal", protect, adminCheck , totalMealCount);
export default router;