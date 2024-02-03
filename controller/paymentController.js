import crypto from "crypto";
import PaymentModel from "../models/payment.js"
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import CouponModel from "../models/coupon.js";
import { Meal } from "../models/meal.js";

const razorpay = new Razorpay({key_id : process.env.RAZORPAY_ID_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY});

const initiatePayment = async(req,res)=>{
    const {selected,amount} = req.body;

    // const MealData = await Meal.find({}).select({_id : 0});

    // let total = 0;
    // for(let j=0;j<7;j++){
    //     if(selected[0][j] == true) total += MealData[0].cost;
    //     if(selected[1][j] == true) total += MealData[1].cost;
    //     if(selected[2][j] == true) total += MealData[2].cost;
    // }
    // console.log(total,amount);

    const order = await razorpay.orders.create({
        amount : amount*100,
        currency : "INR",
    });

    const pay = await PaymentModel.create({orderId : order.id, selected});
    console.log(pay);
    res.send(order);

    // try{
    //     const options = {
    //         amount: Number(amount*100),
    //         currency: "INR",
    //         receipt: crypto.randomBytes(10).toString("hex")
    //     };

    //     razorpay.orders.create(options, async(error,order)=>{
    //         if(error){
    //             return res.status(500).json({message : error});
    //         }
    //         await PaymentModel.create({orderId: order.id,selected})
    //         return res.status(200).json({data : order});
    //     })

    // }catch(error){
    //     res.status(500).json({message : "Server Error"});
    // }
}

const paymentStatus = async(req,res)=>{

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const pay = validatePaymentVerification({order_id:razorpay_order_id, payment_id:razorpay_payment_id}, razorpay_signature, process.env.RAZORPAY_SECRET_KEY);
    if(pay){
        const order = await PaymentModel.findOne({orderId : razorpay_order_id});
        console.log(order);
        const d = await CouponModel.updateOne({email : req.user?.email}, {$set : {week : order.selected,taken : true}}, { upsert: true });
        console.log(d);
    }

    res.json(pay)

    // try{
    //     const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    //     const tempSign = razorpay_order_id+"|"+razorpay_payment_id;
    //     const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(tempSign.toString()).digest("hex");

    //     if(razorpay_signature === expectedSign){
    //         const order = await PaymentModel.findOne({razorpay_order_id});
    //         await CouponModel.updateOne({email : req.user?.email}, {$set : {week : order.selected,taken : true}}, { upsert: true });
    //         return res.status(200).json({message : "Payment done"});
    //     }
    //     else return res.status(400).json({message : "Invalid signature"});

    // }catch(error){
    //     res.status(500).json({message : "Internal server error"});
    // }
}

export {initiatePayment, paymentStatus};