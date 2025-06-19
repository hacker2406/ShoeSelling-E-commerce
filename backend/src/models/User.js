import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, required: true }, // New field for phone number
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    }, // New field for address
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Optional: Order history
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Optional: Wishlist
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
