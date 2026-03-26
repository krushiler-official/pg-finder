import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PG",
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    mobile: {
        type: String,
        default: "",
    },
    workplace: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "Confirmed",
    },
}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
