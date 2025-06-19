import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      {product.images && product.images.length > 0 ? (
        <div className="flex gap-2 mb-4">
          {product.images.map((img, idx) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={`${product.name} ${idx + 1}`}
              className="w-32 h-32 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <img
          src="https://via.placeholder.com/400x300"
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <div className="mb-2 text-gray-600 capitalize">Section: {product.section}</div>
      <div className="mb-2 font-bold text-blue-700">₹{product.price}</div>
      <div className="mb-4">{product.description}</div>
      {/* Add size selection, add to cart, etc. here */}
    </div>
  );
};

export default ProductDetail;