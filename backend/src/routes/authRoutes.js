import express from "express";
import { registerUser, loginUser, registerAdmin, changePassword } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Normal user registration
router.post("/register-admin", protect, adminOnly, registerAdmin); // Admin registration (admin only)
router.post("/login", loginUser); // User login
router.post("/change-password", protect, changePassword); // Change password

export default router;
