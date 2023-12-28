const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    googleId : String,
    profilePic : String,
})

const User = mongoose.model('user',userSchema);
module.exports = User;