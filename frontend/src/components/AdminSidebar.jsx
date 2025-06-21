import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function AdminSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen fixed left-0 top-0 shadow-2xl z-20">
      <div className="p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center mb-2 shadow-lg">
            <span className="text-3xl font-extrabold text-white">A</span>
          </div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Admin Panel
          </h1>
          <p className="mt-1 text-gray-400 text-sm">
            Welcome, <span className="font-semibold">{user?.name}</span>
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 mb-8">
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin/dashboard"
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-blue-700/80 hover:shadow-lg hover:shadow-blue-500/20
                bg-gray-700/60 backdrop-blur-sm font-semibold"
              >
                <span role="img" aria-label="dashboard" className="mr-2">
                  📊
                </span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-blue-700/80 hover:shadow-lg hover:shadow-blue-500/20
                bg-gray-700/60 backdrop-blur-sm font-semibold"
              >
                <span role="img" aria-label="products" className="mr-2">
                  🛒
                </span>
                Manage Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-blue-700/80 hover:shadow-lg hover:shadow-blue-500/20
                bg-gray-700/60 backdrop-blur-sm font-semibold"
              >
                <span role="img" aria-label="orders" className="mr-2">
                  📦
                </span>
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-blue-700/80 hover:shadow-lg hover:shadow-blue-500/20
                bg-gray-700/60 backdrop-blur-sm font-semibold"
              >
                <span role="img" aria-label="users" className="mr-2">
                  👥
                </span>
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/register"
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-blue-700/80 hover:shadow-lg hover:shadow-blue-500/20
                bg-gray-700/60 backdrop-blur-sm font-semibold"
              >
                <span role="img" aria-label="add-admin" className="mr-2">
                  ➕
                </span>
                Register Admin
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700 transition-all duration-200
          shadow-lg hover:shadow-xl text-left font-bold"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
