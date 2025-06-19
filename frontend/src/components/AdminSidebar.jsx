import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function AdminSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Admin Panel
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            Welcome, {user?.name}
          </p>
        </div>

        {/* Navigation Section with added margin bottom */}
        <nav className="flex-1 mb-6">
          <ul className="space-y-3">
            <li>
              <Link 
                to="/admin/dashboard" 
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-800/20
                bg-gray-700/50 backdrop-blur-sm"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/products" 
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-800/20
                bg-gray-700/50 backdrop-blur-sm"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/users" 
                className="block px-4 py-3 rounded-lg transition-all duration-200
                hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-800/20
                bg-gray-700/50 backdrop-blur-sm"
              >
                Manage Users
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700 transition-all duration-200
          shadow-lg hover:shadow-xl text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
