import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import UserRouter from "./routes/userRoutes.js"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Route handlers
app.use("/api/user",UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
