import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";

const getWeekMenu = async(req,res)=>{
    //complete menu : 
    const MenuData = await Day.find({});
    res.send(MenuData);
}

const getMealData = async(req,res)=>{
    const MealData = await Meal.find({});
    res.send(MealData);
}

export {getWeekMenu,getMealData};