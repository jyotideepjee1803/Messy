import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } =  mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false }
})

// Checking if entered password by user during login is authentic
userSchema.methods.matchPasswords = async function (enteredPassword) {
    const ans = await bcrypt.compare(enteredPassword, this.password);
    return ans;
};

userSchema.pre("save", async function (next) {
    // Encrypt the password only if it's modified or created
    if (this.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        return;
      } catch (error) {
        next(error);
      }
    }
    next();
});

const userModel = mongoose.model('user', userSchema);

export default userModel;