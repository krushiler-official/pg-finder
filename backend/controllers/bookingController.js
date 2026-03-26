import Booking from "../models/Booking.js";
import PG from "../models/PG.js";
import User from "../models/User.js";

export const createBooking = async (req, res) => {
    try {
        const { pgId, userId, checkInDate, checkOutDate, totalPrice, mobile, workplace } = req.body;

        if (!pgId || !userId || !checkInDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const pgExists = await PG.findById(pgId);
        if (!pgExists) {
            return res.status(404).json({ message: "PG not found" });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const newBooking = new Booking({
            user: userId,
            pg: pgId,
            checkInDate: new Date(checkInDate),
            checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
            totalPrice: totalPrice || 0,
            mobile: mobile || "",
            workplace: workplace || "",
        });

        await newBooking.save();

        res.status(201).json({ message: "Booking confirmed successfully", booking: newBooking });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId })
            .populate("pg")
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Get User Bookings Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOwnerBookings = async (req, res) => {
    try {
        // 1. Find all PGs owned by this user
        const ownerPGs = await PG.find({ ownerId: req.user._id });
        const ownerPGIds = ownerPGs.map(pg => pg._id);

        if (ownerPGIds.length === 0) {
            return res.json([]); // The owner has no PGs, so they can't have bookings
        }

        // 2. Find Bookings that belong to any of these PGs
        const bookings = await Booking.find({ pg: { $in: ownerPGIds } })
            .populate("pg", "name price location")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        // Calculate total revenue from stored totalPrice or fallback to pg.price
        const enriched = bookings.map((b) => {
            const obj = b.toObject();
            if (!obj.totalPrice && obj.pg?.price) {
                obj.totalPrice = typeof obj.pg.price === "number" ? obj.pg.price : 0;
            }
            return obj;
        });

        res.status(200).json(enriched);
    } catch (error) {
        console.error("Owner Bookings Error:", error);
        res.status(500).json({ message: "Internal server error fetching owner bookings." });
    }
};
