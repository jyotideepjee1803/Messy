import mongoose from "mongoose";
const {Schema} = mongoose;

const paymentSchema = new Schema({
    orderId: String,
    selected : [
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600,// this is the expiry time in seconds
    },
})

const PaymentModel = mongoose.model('Payment', paymentSchema);
export default PaymentModel;