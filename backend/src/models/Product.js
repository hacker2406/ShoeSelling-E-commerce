// 

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    section: {
      type: String,
      enum: ["male", "female", "kids"],
      required: true,
    },
    images: [
      {
        public_id: { type: String, required: true }, // Cloudinary public ID
        url: { type: String, required: true }, // Cloudinary URL
      },
    ],
    sizes: {
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
      6: { type: Number, default: 0 },
      7: { type: Number, default: 0 },
      8: { type: Number, default: 0 },
      9: { type: Number, default: 0 },
      10: { type: Number, default: 0 },
      11: { type: Number, default: 0 },
      12: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
