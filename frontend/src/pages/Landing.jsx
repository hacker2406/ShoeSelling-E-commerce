import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "Guest"}!
        </h1>
        <p className="text-gray-600 mt-4">
          This is your dashboard. Explore products, manage your account, and more.
        </p>

        {/* Example Dashboard Content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
            <p className="text-gray-600 mt-2">
              View and manage your past orders.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/orders")}
            >
              View Orders
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
            <p className="text-gray-600 mt-2">
              Update your profile and account settings.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/my-account")}
            >
              Manage Account
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Explore Products</h2>
            <p className="text-gray-600 mt-2">
              Browse our collection of amazing products.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
