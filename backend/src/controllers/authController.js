import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
  
  /**
   * Register User
   */
  export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body; // Only include essential fields
  
    try {
      console.log("Incoming registration request:", req.body); // Log incoming request body
  
      let userExists = await User.findOne({ email });
      if (userExists) {
        console.error("User already exists with email:", email); // Log duplicate user error
        return res.status(400).json({ message: "User already exists" });
      }
  
      const userCount = await User.countDocuments();
      let newUserIsAdmin = userCount === 0 ? true : false;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        isAdmin: newUserIsAdmin,
      });
  
      const savedUser = await user.save();
      console.log("User registered successfully:", savedUser); // Log successful registration
  
      res.json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        isAdmin: savedUser.isAdmin,
        token: generateToken(savedUser._id, savedUser.isAdmin),
      });
    } catch (error) {
      console.error("Error during registration:", error.message); // Log error details
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  /**
   * Login User
   */
  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone, // Include phone in the response
          isAdmin: user.isAdmin,
          token: generateToken(user._id, user.isAdmin),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  /**
   * Register Admin
   */
  export const registerAdmin = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
      let userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        isAdmin: true, // <-- Always true for this route!
      });
      const savedUser = await user.save();
      res.json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        isAdmin: savedUser.isAdmin,
        token: generateToken(savedUser._id, savedUser.isAdmin),
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };