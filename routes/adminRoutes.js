import { Router } from "express";
import { setMealCostTime, setMenu } from "../controller/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { totalMealCount } from "../controller/couponController.js";

const router = Router();

router.post("/setmenu" , protect , setMenu);
router.post("/setmeal" , protect , setMealCostTime);
router.get("/totalmeal", totalMealCount);
export default router;