import multer from  "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "products", // Cloudinary folder where images will be stored
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize images
    },
  });
  
  const upload = multer({ storage });
  
  export default upload;