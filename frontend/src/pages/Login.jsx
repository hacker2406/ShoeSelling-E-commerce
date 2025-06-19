import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Store user data and redirect
      login(data);
      if (data.isAdmin) {
        navigate("/admin/dashboard"); // Redirect Admins
      } else {
        navigate("/landing"); // Redirect Users
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">Please sign in to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 
            rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
            transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Optional: Additional Features */}
        <div className="mt-6 text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
