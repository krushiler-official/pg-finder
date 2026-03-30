import User from "../models/User.js";
import PG from "../models/PG.js";
import Booking from "../models/Booking.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role === "admin") return res.status(403).json({ message: "Cannot delete an admin" });
        await user.deleteOne();
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPGs = async (req, res) => {
    try {
        const pgs = await PG.find().populate("ownerId", "name email").sort({ _id: -1 });
        res.json(pgs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const adminDeletePG = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);
        if (!pg) return res.status(404).json({ message: "PG not found" });
        await pg.deleteOne();
        res.json({ message: "PG deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const adminUpdatePG = async (req, res) => {
    try {
        const pg = await PG.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pg) return res.status(404).json({ message: "PG not found" });
        res.json(pg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        await booking.deleteOne();
        res.json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("pg", "name location price")
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
