// Role-based access middleware
// Re-exports from authMiddleware for semantic clarity and future extensibility

export { protect, owner } from "./authMiddleware.js";

// Generic role checker — usage: requireRole("owner") or requireRole("admin")
export const requireRole = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        next();
    } else {
        res.status(403).json({ message: `Access denied. Requires role: ${role}` });
    }
};
