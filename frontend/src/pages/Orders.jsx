import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

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

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow p-4">
              <div className="mb-2 font-semibold">
                Order #{order._id.slice(-6).toUpperCase()} • {new Date(order.createdAt).toLocaleString()}
              </div>
              <div className="mb-2 text-sm text-gray-600">Status: {order.status}</div>
              <div>
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-2 border-b last:border-b-0">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold">{item.product.name}</div>
                      <div className="text-sm text-gray-500">Size: {item.size}</div>
                      <div className="text-sm text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-bold">Total: ₹{order.total}</div>
              <div className="text-sm text-gray-500">Shipping: {order.shippingInfo.address}, {order.shippingInfo.phone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;