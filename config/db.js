const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo Connected successfully`);
    } catch (error) {
        console.log(`Connection error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;