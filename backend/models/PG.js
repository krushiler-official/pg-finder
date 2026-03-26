import mongoose from "mongoose";

const pgSchema = new mongoose.Schema({
    name: String,
    location: String,
    area: String,
    price: Number,
    gender: String,
    amenities: [String],
    image: String,
    images: [String],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

export default mongoose.model("PG", pgSchema);