import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Notice from "../models/notices.js";

const setMealCostTime = async(req,res)=>{
    const data = req.body.mealData;
    await Meal.deleteMany({});
    const response = await Meal.insertMany(data);
    
    res.send(response);
}

const setMenu = async(req,res)=>{
    const data = req.body.menuData;
    await Day.deleteMany({});
    const response = await Day.insertMany(data);
    
    res.send(response);
}

const pushNotice = async(req,res)=>{
    const {subject, body} = req.body;
    const newNotice = {subject, body};
    const response = await Notice.create(newNotice);

    res.send(response);
}

export {setMealCostTime, setMenu, pushNotice};