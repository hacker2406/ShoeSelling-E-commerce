import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [section, setSection] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data.products || data);
        // Set max price for slider
        const prices = (data.products || data).map((p) => p.price);
        setMaxPrice(Math.max(...prices, 10000));
        setPriceRange([0, Math.max(...prices, 10000)]);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter and search logic
  let filteredProducts = products
    .filter((p) => section === "all" || p.section === section)
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Sorting logic
  if (sort === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sort === "newest") filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full mb-6 md:mb-0">
        <div className="bg-white rounded shadow p-4 sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Section</label>
            {["all", "male", "female", "kids"].map((sec) => (
              <button
                key={sec}
                className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                  section === sec
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSection(sec)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Price Range</label>
            <Slider
              range
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={setPriceRange}
              trackStyle={[{ backgroundColor: "#2563eb" }]}
              handleStyle={[
                { borderColor: "#2563eb" },
                { borderColor: "#2563eb" },
              ]}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold">Shop Shoes</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search shoes..."
              className="border rounded px-3 py-2 w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-2 py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
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
      </main>
    </div>
  );
};

export default Products;