import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import  userRoutes  from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import { appErrorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import configureSocketEvents from './config/socket.js';

const app = express();
const DIRNAME = path.resolve();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use("/api/user",userRoutes);
app.use("/api/admin" ,adminRoutes);

// ====================  Deployment ========================= //
if (process.env.NODE_ENV === "production") {
  // Establishes the path to our frontend (most important)
  app.use(express.static(path.join(DIRNAME, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(DIRNAME, "../client/build/index.html"))
  );
}
// ====================  Deployment ========================= //

// Error middlewares 
app.all('*', notFoundHandler);
app.use(appErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

configureSocketEvents(server);