import mongoose from "mongoose";
const {Schema} = mongoose;

const mealSchema = new Schema({
   mealName : String,
   time : String,
   cost : Number
});

const Meal = mongoose.model('Meal', mealSchema) 
export {Meal};