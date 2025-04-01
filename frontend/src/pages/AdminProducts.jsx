import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products"); // Replace with your actual API endpoint
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          console.error("API response is not an array:", data);
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
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } else {
        console.error("Failed to delete product:", response.statusText);
        alert("Failed to delete product. Please try again.");
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

        {/* Product Table */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="border p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">${product.price}</td>
                    <td className="border p-2">
                      <a href={`/admin/edit-product/${product._id}`} className="text-blue-600 px-2">
                        Edit
                      </a>
                      <button
                        className="text-red-600 px-2"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
