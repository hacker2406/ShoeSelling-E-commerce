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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar />

      {/* Main Content - Added margin-left to account for fixed sidebar */}
      <main className="flex-1 p-8 ml-64">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-1">
              Manage Products
            </h2>
            <button
              onClick={() => navigate("/admin/products/add")}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg 
              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 
              flex items-center space-x-2"
            >
              <span className="text-xl">+</span>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 
              overflow-hidden border border-gray-100"
            >
              <div className="p-6 flex items-center gap-6">
                {/* Image Section */}
                <div className="relative group">
                  <img
                    src={product.images[0]?.url || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-md group-hover:scale-105 
                    transition-transform duration-200"
                  />
                </div>

                {/* Product Info Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          ${product.price}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg 
                        hover:bg-blue-100 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg 
                        hover:bg-red-100 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="mt-4">
                    <div className="bg-gray-50 rounded-lg p-3 max-h-24 overflow-y-auto 
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {product.sizes && Object.keys(product.sizes).length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(product.sizes).map(([size, quantity]) => (
                            <div 
                              key={size}
                              className="flex justify-between items-center p-2 bg-white 
                              rounded-md shadow-sm"
                            >
                              <span className="font-medium text-gray-600">Size {size}</span>
                              <span className={`px-2 py-1 rounded-full text-xs 
                                ${quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">
                          No stock information available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
