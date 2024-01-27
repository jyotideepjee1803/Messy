import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Coupon from "../models/coupon.js";

const setMealCostTime = async(req,res)=>{
    const data = req.body.mealData;
    await Meal.deleteMany({});
    await Meal.insertMany(data);
    res.send();
}

const setMenu = async(req,res)=>{
    const data = req.body.menuData;
    await Day.deleteMany({});
    await Day.insertMany(data);
    res.send();
}

export {setMealCostTime, setMenu};