import { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.post(
        "http://localhost:5000/api/auth/register-admin",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Admin registered successfully!");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register admin."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-extrabold text-blue-700 mb-6 text-center">
          Register New Admin
        </h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-lg shadow transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;