import mongoose from "mongoose";
const {Schema} = mongoose;

const mealSchema = new Schema({
   mealName : String,
   time : String,
   cost : Number
},{versionKey: false});

const Meal = mongoose.model('Meal', mealSchema) 
export {Meal};