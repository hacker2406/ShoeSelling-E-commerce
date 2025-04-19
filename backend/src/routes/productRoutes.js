import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", protect, adminOnly, upload.array("images", 5), createProduct); 
router.get("/", getProducts); // Public: Get all products
router.get("/:id", getProductById); // Public: Get product by ID
router.put("/:id", protect, adminOnly, upload.array("images", 5), updateProduct); // Admin: Update product// Admin: Update product
router.delete("/:id", protect, adminOnly, deleteProduct); // Admin: Delete product

export default router;
