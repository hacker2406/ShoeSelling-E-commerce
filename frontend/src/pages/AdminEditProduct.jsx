import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AdminEditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState([]); // New images to upload
  const [imagePreviews, setImagePreviews] = useState([]); // Previews for new images
  const [existingImages, setExistingImages] = useState([]); // Existing images from Cloudinary

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
          setExistingImages(data.product.images); // Set existing images
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveExistingImage = (publicId) => {
    setExistingImages((prev) => prev.filter((image) => image.public_id !== publicId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("size-")) {
      const size = name.split("-")[1]; // Extract size number
      setProduct((prev) => ({
        ...prev,
        sizes: { ...prev.sizes, [size]: parseInt(value, 10) || 0 },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("existingImages", JSON.stringify(existingImages)); // Send remaining existing images
    formData.append("section", product.section); // Include section in form data

    // Append new images if any
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      } else {
        const errorData = await response.json();
        alert(`Failed to update product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading Product...</div>;
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-8">
          Edit Product
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

          {/* Section Selection */}
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

          {/* Existing Images Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {existingImages.map((image) => (
                <div key={image.public_id} className="relative group">
                  <img
                    src={image.url}
                    alt="Existing"
                    className="w-full h-24 object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.public_id)}
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

          {/* New Images Upload Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-4">Add New Images</label>
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
            
            {/* New Image Previews */}
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
                      setNewImages(prev => prev.filter((_, i) => i !== index));
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg 
            font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 
            transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Update Product
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditProduct;