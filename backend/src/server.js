import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// use authentication Routes
app.use("/api/auth", authRoutes);

//Use product Routes
app.use("/api/products", productRoutes);

//Use user Routes
app.use("/api/users", userRoutes);

// Use cart Routes
app.use("/api/cart", cartRoutes);

// Use order Routes
app.use("/api/orders", orderRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Shoe E-Commerce Backend is Running!");
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
