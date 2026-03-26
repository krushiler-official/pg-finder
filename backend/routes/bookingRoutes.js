import express from "express";
import { createBooking, getUserBookings, getOwnerBookings } from "../controllers/bookingController.js";
import { protect, owner } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);

// Owner strictly protected route
router.get("/owner/bookings", protect, owner, getOwnerBookings);

export default router;
