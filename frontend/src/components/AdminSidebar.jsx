import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function AdminSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="mt-2 text-gray-400">Welcome, {user?.name}</p>

      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/products" className="block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
              Manage Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
              Manage Users
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded bg-red-600 hover:bg-red-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
