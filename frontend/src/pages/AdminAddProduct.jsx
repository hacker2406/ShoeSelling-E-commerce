import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import AdminLayout from "../components/AdminLayout";

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
    section: "", // <-- Add this line
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
      formData.append("section", product.section);
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
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-8">
          Add New Product
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Category & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-4">Product Images</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-200">
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Choose Files
              </button>
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            
            {/* Image Previews */}
            <div className="mt-4 grid grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviews(prev => prev.filter((_, i) => i !== index));
                      setImages(prev => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 
                    shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes Grid */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock per Size</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {Object.keys(product.sizes).map((size) => (
                <div key={size} className="bg-white p-3 rounded-lg shadow-sm">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Size {size}</label>
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
          </div>

          {/* Section Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              name="section"
              value={product.section}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="">Select Section</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5'} 
            transition-all duration-200 shadow-lg hover:shadow-xl`}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
