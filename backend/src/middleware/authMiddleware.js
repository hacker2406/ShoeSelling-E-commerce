import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify user authentication
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Log the decoded JWT for debugging

    req.user = await User.findById(decoded.id).select("-password");
    console.log("User from DB:", req.user); // Log the user data from DB

    next();
  } catch (error) {
    console.error("Error in protect middleware:", error); // Log error details
    res.status(401).json({ message: "Not authorized" });
  }
};

// Middleware to allow only admins
export const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.log("User is not admin"); // Log if the user is not an admin
    return res.status(403).json({ message: "Admin access required. Access Denied!" });
  }
  console.log("User is admin"); // Log if the user is an admin
  next();
};
