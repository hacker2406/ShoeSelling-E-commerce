import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "products", // Folder name in Cloudinary
    format: async (req, file) => file.mimetype.split("/")[1], // Use the file's MIME type
    public_id: (req, file) => `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique public ID
  },
});

// Multer Upload Middleware with File Validation
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export { upload, cloudinary };
