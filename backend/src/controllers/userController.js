import User from "../models/User.js";

// Update user profile (protected route)
export const updateUserProfile = async (req, res) => {
  try {
    console.log("Received update profile request");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const user = await User.findById(req.user._id);
    console.log("User found in DB:", user);

    if (!user) {
      console.log("User not found for ID:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;

    // Email update with uniqueness check
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      console.log("Email exists check:", emailExists);
      if (emailExists) {
        console.log("Email already in use:", req.body.email);
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = req.body.email;
    }

    // Address: merge provided fields with existing
    if (req.body.address) {
      user.address = { ...user.address, ...req.body.address };
      console.log("Updated address:", user.address);
    }

    const updatedUser = await user.save();
    console.log("User after update:", updatedUser);

    // Respond with updated user info (never password)
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get user profile (protected route)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};