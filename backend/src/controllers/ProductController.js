import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js";


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, section } = req.body; // <-- add section

    // Validate required fields
    if (!name || !description || !price || !category || !sizes || !section) { // <-- add section
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Upload images to Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedImage = await cloudinary.uploader.upload(file.path);
        return {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        };
      });

      images = await Promise.all(uploadPromises);
    }

    // Ensure `sizes` contains only valid shoe sizes (4-12)
    const validSizes = {};
    const allowedSizes = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    const parsedSizes = JSON.parse(sizes);

    allowedSizes.forEach((size) => {
      validSizes[size] = parsedSizes[size] || 0;
    });

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      section, // <-- add section
      images,
      sizes: validSizes,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating product", error: error.message });
  }
};

  
  

// @desc Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
  }
};

// @desc Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product", error: error.message });
  }
};

// @desc Update product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, existingImages, section } = req.body; // <-- add section

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Handle existing images
    let updatedImages = [];
    if (existingImages) {
      updatedImages = JSON.parse(existingImages); // Parse existing images from the request
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const uploadPromises = req.files.map(async (file) => {
        const uploadedImage = await cloudinary.uploader.upload(file.path);
        return {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        };
      });

      const newImages = await Promise.all(uploadPromises);
      updatedImages = [...updatedImages, ...newImages]; // Combine existing and new images
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.section = section || product.section; // <-- add this line
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.images = updatedImages; // Update images

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
};

// @desc Delete product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    console.log("Deleting product with ID:", req.params.id); // Debugging log

    const product = await Product.findById(req.params.id);

    if (!product) {
      console.error("Product not found");
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("Product found:", product); // Debugging log

    // Delete images from Cloudinary
    const deletePromises = product.images.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );
    await Promise.all(deletePromises);

    // Delete product from database
    await product.deleteOne();
    console.log("Product deleted successfully");
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error); // Debugging log
    res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
  }
};
