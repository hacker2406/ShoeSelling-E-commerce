import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Product</h2>
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

        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Existing Images</label>
          <div className="flex gap-2 mt-2">
            {existingImages.map((image) => (
              <div key={image.public_id} className="relative">
                <img
                  src={image.url}
                  alt="Existing"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(image.public_id)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload New Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {/* Display new image previews */}
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;