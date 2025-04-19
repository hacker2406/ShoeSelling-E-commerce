import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const AdminAddProduct = () => {
  const { user } = useAuth(); // Get admin token
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form Data State
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: {
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    },
  });

  const [images, setImages] = useState([]); // Store selected image files
  const [imagePreviews, setImagePreviews] = useState([]); // Store image previews

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("size-")) {
      // Handle size input separately
      const size = name.split("-")[1]; // Extract size number
      setProduct((prev) => ({
        ...prev,
        sizes: { ...prev.sizes, [size]: parseInt(value, 10) || 0 },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
  
    // Append new files to the existing images array
    setImages((prevImages) => [...prevImages, ...files]);
  
    // Generate previews for the new files
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append product details to FormData
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("sizes", JSON.stringify(product.sizes));

      // Append images to FormData
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // Admin authentication
        },
        body: formData, // Send FormData
      });

      if (response.ok) {
        alert("Product added successfully!");
        navigate("/admin/products"); // Redirect to product list
      } else {
        const errorData = await response.json();
        alert(`Failed to add product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="mt-1 w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
          >
            Choose Files
          </button>
          <input
            id="fileInput"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default file input
          />
          {/* Display selected file names */}
          <div className="mt-2">
            {images.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {images.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Display image previews */}
          <div className="flex gap-2 mt-2">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Shoe Sizes */}
        <h3 className="text-lg font-semibold text-gray-800 mt-4">Stock per Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(product.sizes).map((size) => (
            <div key={size} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Size {size}</label>
              <input
                type="number"
                name={`size-${size}`}
                value={product.sizes[size]}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
