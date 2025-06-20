import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SIZES = [4, 5, 6, 7, 8, 9, 10, 11, 12];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data.product || data);
      } catch (err) {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!product) return <div className="text-center text-red-500">Product not found.</div>;

  
  // Ensure sizes is always an object
  const sizeStock = typeof product.sizes === "object" && product.sizes !== null ? product.sizes : {};

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 flex flex-col md:flex-row gap-10">
      {/* Product Images */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-md">
          <img
            src={product.images?.[0]?.url || "https://via.placeholder.com/400x300"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={img.public_id}
                src={img.url}
                alt={`${product.name} ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-lg">★ ★ ★ ★ ☆</span>
            <span className="text-gray-500 text-sm">(4.0)</span>
            {/* You can replace with dynamic rating */}
          </div>
          <div className="text-2xl font-semibold text-blue-700 mb-4">₹{product.price}</div>
          <div className="mb-2 text-gray-600 capitalize">Section: {product.section}</div>
          {/* Size Selection */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Select Size</div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((size) => {
                const available = sizeStock[size] > 0;
                return (
                  <button
                    key={size}
                    disabled={!available}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border text-lg font-medium transition
                      ${selectedSize === size ? "bg-blue-600 text-white border-blue-600" : "bg-white"}
                      ${!available ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400"}
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-400 mt-1">Sizes: 4 - 12 (UK)</div>
          </div>
          {/* Add to Cart Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
            disabled={!selectedSize}
          >
            {selectedSize ? "Add to cart" : "Select a size"}
          </button>
          {/* Description */}
          <div className="mt-8">
            <div className="font-semibold mb-1">Description</div>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;