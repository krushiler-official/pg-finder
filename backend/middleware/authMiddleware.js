import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT & load user into req
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
            req.user = await User.findById(decoded.id).select("-password");
            
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Check if user is an owner
export const owner = (req, res, next) => {
    if (req.user && req.user.role === "owner") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an owner" });
    }
};
