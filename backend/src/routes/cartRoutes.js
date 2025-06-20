import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user's cart
router.get("/", protect, getCart);

// Add or update item in cart
router.post("/", protect, addToCart);

// Remove item from cart
router.delete("/:itemId", protect, removeFromCart);

// Clear cart
router.delete("/", protect, clearCart);

export default router;