import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Normal user registration
router.post("/register-admin", protect, adminOnly, registerUser); // Admin registration (admin only)
router.post("/login", loginUser); // User login

export default router;
