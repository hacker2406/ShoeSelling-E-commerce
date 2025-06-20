import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Log user and token info
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Stored user from localStorage:", storedUser);
      const token = storedUser?.token;
      console.log("Token being sent:", token);

      if (!token) {
        setError("You must be logged in to place an order.");
        setLoading(false);
        return;
      }

      // Log request body
      console.log("Order request body:", { address, phone });

      // Log headers
      const headers = { Authorization: `Bearer ${token}` };
      console.log("Request headers:", headers);

      // Make the request and log the response
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        { address, phone },
        { headers }
      );
      console.log("Order placed response:", response.data);

      setSuccess("Order placed successfully!");
      clearCart();
      setTimeout(() => navigate("/orders"), 1500);
    } catch (err) {
      // Log error details
      console.error("Order placement error:", err);
      setError(
        err.response?.data?.message || "Failed to place order. Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl min-h-[70vh] flex flex-col items-center">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center tracking-tight">
          Checkout
        </h1>
        <form onSubmit={handleOrder} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Shipping Address
            </label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={2}
              placeholder="Enter your full shipping address"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center font-semibold">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-center font-semibold">{success}</div>
          )}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-lg shadow transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
          Order Preview
        </h2>
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b last:border-b-0 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold">{item.product.name}</div>
                    <div className="text-xs text-gray-500">
                      Size: {item.size} | Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-blue-700">
                  ₹{item.product.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;