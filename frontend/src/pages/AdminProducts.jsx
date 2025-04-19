import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          console.error("API response is not valid:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("user")); // Parse the stored user object
      const token = storedUser?.token; // Safely access the token
      console.log("Token being sent:", token); // Debugging log

      if (!token) {
        alert("You are not authorized to perform this action.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete product:", errorData.message);
        alert(`Failed to delete product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading Products...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-gray-800">Manage Products</h2>

        {/* Add Product Button */}
        <div className="mt-4">
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
        </div>

        {/* Product List */}
        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              {/* Product Image and Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={product.images[0]?.url || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
              </div>

              {/* Stock Info */}
              <div className="flex-1 mx-6">
                <div className="bg-gray-100 rounded-lg p-2 max-h-20 overflow-y-auto">
                  {product.sizes && Object.keys(product.sizes).length > 0 ? (
                    Object.entries(product.sizes).map(([size, quantity]) => (
                      <div key={size} className="flex justify-between text-sm text-gray-700">
                        <span>Size: {size}</span>
                        <span>Available: {quantity}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No stock information available</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
