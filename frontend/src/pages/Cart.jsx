import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, loading, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) return <div className="text-center py-10">Loading cart...</div>;

  return (
    <div className="container mx-auto px-4 py-10 min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
        🛒 Your Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-32 h-32 mb-4 opacity-70"
          />
          <div className="text-lg text-gray-500 mb-2">Your cart is empty.</div>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b last:border-b-0 py-4 group"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <div className="font-bold text-lg">{item.product.name}</div>
                    <div className="text-sm text-gray-500">
                      Size:{" "}
                      <span className="font-semibold">{item.size}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">₹{item.product.price}</span> x{" "}
                      {item.quantity}
                    </div>
                  </div>
                </div>
                <button
                  className="text-red-500 font-semibold opacity-70 hover:opacity-100 hover:underline transition"
                  onClick={() => removeFromCart(item._id)}
                  title="Remove from cart"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="w-full md:w-80 bg-gray-50 rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="border-t my-3"></div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
            <button
              className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;