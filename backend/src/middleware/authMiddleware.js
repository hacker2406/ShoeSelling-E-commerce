import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify user authentication
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token
      console.log("Token received in middleware:", token); // Debugging log

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log("Decoded token:", decoded); // Debugging log

      req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
      console.log("User attached to request:", req.user); // Debugging log

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message); // Debugging log
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    console.error("No token provided"); // Debugging log
    res.status(401).json({ success: false, message: "Not authorized, no token" });
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
