import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
      // Log the incoming request data
      console.log("Request Body:", req.body); // Debugging: Check what data is being sent
  
      const { name, description, price, category, images, stock } = req.body;
  
      // Check if all required fields are present
      if (!name || !description || !price || !category || !images || !stock) {
        console.log("Missing required fields"); // Debugging: Log if any field is missing
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const newProduct = new Product({ name, description, price, category, images, stock });
  
      // Try to save the product and log success or failure
      const savedProduct = await newProduct.save();
      console.log("Product Saved:", savedProduct); // Debugging: Log the saved product
  
      res.status(201).json({ success: true, message: "Product created successfully", product: savedProduct });
    } catch (error) {
      console.error("Error creating product:", error); // Log the error in detail
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
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
};

// @desc Delete product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
  }
};
