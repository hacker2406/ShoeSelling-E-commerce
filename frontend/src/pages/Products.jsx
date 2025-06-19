import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [section, setSection] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data.products || data); // adapt if your backend returns {products: [...]}
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter products by section
  const filteredProducts =
    section === "all"
      ? products
      : products.filter((p) => p.section === section);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop Shoes</h1>
      <div className="flex justify-center gap-4 mb-8">
        {["all", "male", "female", "kids"].map((sec) => (
          <button
            key={sec}
            className={`px-4 py-2 rounded ${
              section === sec
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSection(sec)}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;