import express from "express";
import { getAllUsers, deleteUser, getAllPGs, adminDeletePG, adminUpdatePG, getAllBookings, deleteBooking } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin role check inline (avoids circular imports)
const admin = (req, res, next) => {
    if (req.user?.role === "admin") return next();
    res.status(403).json({ message: "Not authorized as admin" });
};

router.use(protect, admin); // All routes below require login + admin role

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/pgs", getAllPGs);
router.put("/pgs/:id", adminUpdatePG);
router.delete("/pgs/:id", adminDeletePG);

router.get("/bookings", getAllBookings);
router.delete("/bookings/:id", deleteBooking);

export default router;
