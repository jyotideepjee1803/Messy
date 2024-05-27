import CouponModel from "../models/coupon.js";


const couponValidity = async(req,res)=>{
    const {email, day, mealType} = req.body;
    const student = await CouponModel.findOne({email});
    let fl = false;
    if(student && student.week[mealType][day] == true){
        fl = true;
    }   
    
    res.send(fl);
}

const totalMealCount = async(req,res)=>{
    const allCoupons = await CouponModel.find({}); //get all purchased coupons  
    let toMake = [
        [0, 0, 0, 0, 0, 0, 0], // Breakfast
        [0, 0, 0, 0, 0, 0, 0], // Lunch
        [0, 0, 0, 0, 0, 0, 0]  // Dinner
        ];
    
    var date = new Date();
    var currentDateTime = date.toISOString(); 

    const getDayDifference = (dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        const timeDifference = Math.abs(date2.getTime() - date1.getTime());

        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return daysDifference;
    }
    
    allCoupons.forEach(coupon => {
        for(let i=0;i<3;i++){
            for(let j=0;j<7;j++){
                if(coupon.week[i][j] == true && getDayDifference(currentDateTime, coupon.updatedAt) <= 7) toMake[i][j]++;
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