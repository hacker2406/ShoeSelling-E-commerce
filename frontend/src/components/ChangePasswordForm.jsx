import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const ChangePasswordForm = ({ onClose }) => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await axios.put(
        "/api/users/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {success && <div className="text-green-600">Password changed!</div>}
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;