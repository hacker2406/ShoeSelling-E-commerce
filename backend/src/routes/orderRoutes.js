import express from "express";
import { placeOrder, getMyOrders, getOrderById,getAllOrders,updateOrderStatus } from "../controllers/OrderController.js";
import { protect,adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Place a new order from cart
router.post("/", protect, placeOrder);

// Get all orders for current user
router.get("/", protect, getMyOrders);

// Get a specific order by ID for current user
router.get("/:id", protect, getOrderById);

// Get all orders (admin)
router.get("/all", protect, adminOnly, getAllOrders);

// Update order status (admin)
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;