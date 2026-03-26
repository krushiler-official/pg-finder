import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pgRoutes from "./routes/pgRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pgs", pgRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);