import CouponModel from "../models/coupon.js";
import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Notice from "../models/notices.js";

const getWeekMenu = async(req,res)=>{
    //complete menu : 
    const MenuData = await Day.find({}).select({_id: 0}); //skip selecting id
    res.send(MenuData);
}

const getMealData = async(req,res)=>{
    const MealData = await Meal.find({}).select({_id : 0});
    res.send(MealData);
}

const getCouponData = async(req,res)=>{
    const {email} = req.body;
    const coupon = await CouponModel.findOne({email}).select({_id : 0});
    res.json(coupon);
}

const getNotices = async(req,res)=>{
    const AllNotices = await Notice.find({}).select({_id : 0});
    res.send(AllNotices);
}

const getNotificationById = async(req,res)=>{
    const notifId = req.params.id;
    // console.log(notifId);
    const notif = await Notice.findById({_id : notifId});
    // console.log(notif);
    res.json(notif);
}
    
export {getWeekMenu,getMealData,getCouponData,getNotices,getNotificationById};