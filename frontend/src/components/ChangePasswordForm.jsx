import { useState } from "react";
import axios from "axios";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to change password."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
        Change Password
      </h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {message && <div className="text-green-600 text-center">{message}</div>}
      <div>
        <label className="block font-semibold mb-1">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-bold text-lg shadow bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;