import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import CartContext

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart(); // Get cart from context

  // Calculate total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StrideHub
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <div className="relative">
            <Link to="/cart" className="text-gray-600 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M9 21h6"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* User Profile */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <FaUserCircle className="w-7 h-7" />
              <span>{user?.name || "Guest"}</span>
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link
                to="/my-account"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Account
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;