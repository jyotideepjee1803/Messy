import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import  userRoutes  from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Route handlers

//user Routes
app.use("/api/user",userRoutes);

//Admin routes
app.use("/api/admin" ,adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
