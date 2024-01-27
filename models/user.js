import mongoose from "mongoose";
const { Schema } =  mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;