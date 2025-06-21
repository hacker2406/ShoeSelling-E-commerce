// filepath: c:\Users\Ratul Paul\OneDrive\Desktop\Show-E-Commerce\backend\src\routes\userRoutes.js
import express from "express";
import { protect,adminOnly } from "../middleware/authMiddleware.js";
import { updateUserProfile ,getUserProfile,getAllUsers,deleteUser} from "../controllers/userController.js";

const router = express.Router();

// Route to update user profile
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile); 
router.get("/", protect, adminOnly, getAllUsers);
router.delete(" /:id", protect, adminOnly, deleteUser);
export default router;