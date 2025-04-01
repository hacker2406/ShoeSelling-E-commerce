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
    const { name, email, password, isAdmin } = req.body;
  
    try {
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const userCount = await User.countDocuments();
      
      // If no users exist, the first user is automatically an admin
      let newUserIsAdmin = userCount === 0 ? true : false;
  
      // If isAdmin is requested, ensure the request is from an existing admin
      if (req.originalUrl.includes("register-admin")) {
        // Ensure the requester is an admin (protect and adminOnly middleware should already check this)
        newUserIsAdmin = true;
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ 
        name, 
        email, 
        password: hashedPassword,
        isAdmin: newUserIsAdmin
      });
  
      await user.save();
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isAdmin)
      });
    } catch (error) {
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