import CouponModel from "../models/coupon.js";

const couponValidity = async(req,res)=>{
    const {email, day, mealType} = req.body;
    const student = CouponModel.findOne({email});
    if(student == true && student.week[mealType][day]){
        await CouponModel.updateOne({email},{[week[mealType][day]] : false})
        return true;
    }
    return false;
}

const totalMealCount = async(req,res)=>{
    const allCoupons = await CouponModel.find({}); //get all purchased coupons  
    let toMake = [
        [0, 0, 0, 0, 0, 0, 0], // Breakfast
        [0, 0, 0, 0, 0, 0, 0], // Lunch
        [0, 0, 0, 0, 0, 0, 0]  // Dinner
        ];
    
    allCoupons.forEach(coupon => {
        for(let i=0;i<3;i++){
            for(let j=0;j<7;j++){
                if(coupon.week[i][j] == true) toMake[i][j]++;
            }
        }
    });

    const totalMeals = [];
    for(let j=0;j<7;j++){
        const day = {breakfast: toMake[0][j], lunch: toMake[1][j], dinner: toMake[2][j]};
        totalMeals.push(day);
    }
    res.send(totalMeals);
}

const couponPurchase = async(req,res)=>{
    const data = await CouponModel.updateOne({email : req.body.email}, {$set : {week : req.body.selected,taken : true}}, { upsert: true })
    res.send(data);
}

export {couponValidity,totalMealCount,couponPurchase};