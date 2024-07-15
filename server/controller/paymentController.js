import crypto from "crypto";
import PaymentModel from "../models/payment.js"
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import CouponModel from "../models/coupon.js";
import { Meal } from "../models/meal.js";

const razorpay = new Razorpay({key_id : process.env.RAZORPAY_ID_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY});

const initiatePayment = async(req,res)=>{
    const {selected,amount} = req.body;

    const order = await razorpay.orders.create({
        amount : amount*100,
        currency : "INR",
    });

    const pay = await PaymentModel.create({orderId : order.id, selected});
    res.send(order);

}

const paymentStatus = async(req,res)=>{

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const pay = validatePaymentVerification({order_id:razorpay_order_id, payment_id:razorpay_payment_id}, razorpay_signature, process.env.RAZORPAY_SECRET_KEY);
    if(pay){
        const order = await PaymentModel.findOne({orderId : razorpay_order_id});
        const d = await CouponModel.updateOne({email : req.user?.email}, {$set : {week : order.selected,taken : true}}, { upsert: true });
    }

    res.json(pay)
}

export {initiatePayment, paymentStatus};