import mongoose from "mongoose";
const {Schema} = mongoose;

const daySchema = new Schema({
    day : String,
    breakfast : String,
    lunch : String,
    dinner : String
},{versionKey: false});

const Day = mongoose.model('Day', daySchema) 
export {Day};