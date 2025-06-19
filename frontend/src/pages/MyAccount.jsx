import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import ChangePasswordForm from "../components/ChangePasswordForm"; // Adjust path as needed

const emptyAddress = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const MyAccount = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: { ...emptyAddress },
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || { ...emptyAddress },
        });
      } catch (err) {
        setError("Failed to load profile.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      console.log("Updating profile with token:", token);
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Profile updated:", data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      {success && <div className="mb-4 text-green-600 text-center">Profile updated!</div>}
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input
            name="address.street"
            value={form.address.street}
            onChange={handleChange}
            placeholder="Street"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              name="address.state"
              value={form.address.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              name="address.postalCode"
              value={form.address.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              name="address.country"
              value={form.address.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
      <button
        type="button"
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mt-4 transition"
        onClick={() => setShowPasswordModal(true)}
      >
        Change Password
      </button>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPasswordModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2">Change Password</h3>
            <ChangePasswordForm onClose={() => setShowPasswordModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;