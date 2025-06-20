import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight text-center">
        Welcome to StrideHub
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Discover the latest styles and shop your favorite products.
      </p>
      <div className="flex gap-6 w-full justify-center">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow transition text-lg w-1/2 text-center"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white border border-blue-600 text-blue-700 font-bold py-3 px-8 rounded-lg shadow hover:bg-blue-50 transition text-lg w-1/2 text-center"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default Home;