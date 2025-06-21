import { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-purple-100 text-purple-800",
  Cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const approveOrder = async (orderId) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "Approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Refresh orders
    } catch (err) {
      alert("Failed to approve order.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          All Orders (Admin)
        </h1>
        {loading ? (
          <div className="text-center text-lg text-blue-600 font-semibold py-12">
            Loading orders...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-3 font-mono text-xs">{order._id}</td>
                    <td className="p-3">{order.user?.name || "N/A"}</td>
                    <td className="p-3 font-semibold">₹{order.total}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {order.status === "Pending" ? (
                        <button
                          onClick={() => approveOrder(order._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg font-semibold shadow transition"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;