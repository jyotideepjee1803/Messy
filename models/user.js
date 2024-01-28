import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } =  mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false }
})

const User = mongoose.model('user', userSchema);

export default User;