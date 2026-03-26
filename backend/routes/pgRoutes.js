import express from "express";
import { getAllPGs, getPGById, addPG, getOwnerPGs, updatePG, deletePG } from "../controllers/pgController.js";
import { protect, owner } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPGs);
router.get("/:id", getPGById);

// Owner strictly protected routes
router.post("/owner/add-pg", protect, owner, addPG);
router.get("/owner/my-pgs", protect, owner, getOwnerPGs);
router.put("/owner/update-pg/:id", protect, owner, updatePG);
router.delete("/owner/delete-pg/:id", protect, owner, deletePG);

export default router;