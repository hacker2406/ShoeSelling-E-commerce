import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaBoxOpen, FaUserCircle, FaShoePrints, FaStar } from "react-icons/fa";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Welcome Banner */}
      <section className="bg-blue-600 text-white py-12 px-6 rounded-b-3xl shadow-lg">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name || "Guest"}!
          </h1>
          <p className="text-lg mb-4">
            Step into Style – Discover the Latest Shoes for Everyone.
          </p>
          <button
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-100 transition"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Dashboard Cards */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBoxOpen className="text-blue-600 text-4xl mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
            <p className="text-gray-600 mt-2 text-center">
              View and manage your past orders.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/orders")}
            >
              View Orders
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaUserCircle className="text-blue-600 text-4xl mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
            <p className="text-gray-600 mt-2 text-center">
              Update your profile and account settings.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/edit-profile")}
            >
              Manage Account
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShoePrints className="text-blue-600 text-4xl mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">Explore Products</h2>
            <p className="text-gray-600 mt-2 text-center">
              Browse our collection of amazing shoes.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Featured Section (optional) */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Featured Categories
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
              onClick={() => navigate("/products?section=male")}
            >
              Men's Shoes
            </button>
            <button
              className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-semibold hover:bg-pink-200 transition"
              onClick={() => navigate("/products?section=female")}
            >
              Women's Shoes
            </button>
            <button
              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition"
              onClick={() => navigate("/products?section=kids")}
            >
              Kids' Shoes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
