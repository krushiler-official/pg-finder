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

// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL || "https://pgfinder-us.netlify.app",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
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