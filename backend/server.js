import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import pgRoutes from "./routes/pgRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS (IMPORTANT for Netlify frontend)
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://pgfinder-us.netlify.app",// later you can replace with your Netlify URL
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/pgs", pgRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);