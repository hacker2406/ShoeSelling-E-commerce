// filepath: c:\Users\Ratul Paul\OneDrive\Desktop\Show-E-Commerce\backend\src\routes\userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateUserProfile ,getUserProfile} from "../controllers/userController.js";

const router = express.Router();

// Route to update user profile
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile); 

export default router;