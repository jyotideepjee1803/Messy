import express from 'express';
import dotenv from 'dotenv';
// import authRoute from './routes/auth.js';
// import userRoute from './routes/user.js';
import connectDB from './config/db.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Route handlers
// app.use('/auth', authRoute);
// app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
