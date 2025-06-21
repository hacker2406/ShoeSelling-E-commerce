import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-purple-100 text-purple-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = getToken && getToken();
        const { data } = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-blue-600 font-semibold text-lg animate-pulse">
          Loading orders...
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          You have not placed any orders yet.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="font-semibold text-blue-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mb-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-3"
                  >
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                    <div>
                      <div className="font-semibold">{item.product.name}</div>
                      <div className="text-xs text-gray-500">
                        Size: {item.size}
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="font-bold text-lg text-blue-700">
                  Total: ₹{order.total}
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Shipping: {order.shippingInfo.address}, {order.shippingInfo.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;