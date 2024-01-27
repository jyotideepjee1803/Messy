import CouponModel from "../models/coupon";

const couponValidity = async(req,res)=>{
    const {email, day, mealType} = req.body;
    const student = CouponModel.findOne({email});
    if(student == true && student.week[mealType][day]){
        await CouponModel.updateOne({email},{[week[mealType][day]] : false})
        return true;
    }
    return false;
}

export {couponValidity};