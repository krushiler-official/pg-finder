import PG from "../models/PG.js";

export const getAllPGs = async (req, res) => {
    try {
        const pgs = await PG.find();
        res.json(pgs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPGById = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);
        if (!pg) return res.status(404).json({ message: "PG not found" });
        res.json(pg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new PG (Owner only)
// @route   POST /api/pgs/owner/add-pg
export const addPG = async (req, res) => {
    try {
        const { name, location, area, price, gender, amenities, image, images } = req.body;

        const pg = await PG.create({
            name,
            location,
            area,
            price,
            gender,
            amenities,
            image,
            images,
            ownerId: req.user._id 
        });

        res.status(201).json(pg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get PGs owned by logged in owner
// @route   GET /api/pgs/owner/my-pgs
export const getOwnerPGs = async (req, res) => {
    try {
        const pgs = await PG.find({ ownerId: req.user._id });
        res.json(pgs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a PG (Owner only)
// @route   PUT /api/pgs/owner/update-pg/:id
export const updatePG = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);

        if (!pg) {
            return res.status(404).json({ message: "PG not found" });
        }

        // Verify the logged in owner actually owns this PG
        if (pg.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this PG" });
        }

        const updatedPG = await PG.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(updatedPG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a PG (Owner only)
// @route   DELETE /api/pgs/owner/delete-pg/:id
export const deletePG = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);

        if (!pg) {
            return res.status(404).json({ message: "PG not found" });
        }

        if (pg.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this PG" });
        }

        await pg.deleteOne();
        res.json({ message: "PG removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};