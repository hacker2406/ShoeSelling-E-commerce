import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { Link } from "react-router-dom";

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
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: { ...emptyAddress },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-blue-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg mb-3">
            <span className="text-4xl font-extrabold text-white">
              {profile.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">{profile.name}</h2>
          <span className="text-gray-400 text-sm">Welcome to your profile!</span>
        </div>
        <div className="space-y-5">
          <div className="flex items-center">
            <span className="w-32 font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-600">{profile.email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-semibold text-gray-700">Phone:</span>
            <span className="ml-2 text-gray-600">{profile.phone}</span>
          </div>
          <div className="flex items-start">
            <span className="w-32 font-semibold text-gray-700">Address:</span>
            <span className="ml-2 text-gray-600">
              {profile.address.street}, {profile.address.city}, {profile.address.state}, {profile.address.postalCode}, {profile.address.country}
            </span>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/edit-profile"
            className="w-full py-2 rounded-lg font-bold shadow bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-center transition"
          >
            Edit Profile
          </Link>
          <Link
            to="/change-password"
            className="w-full py-2 rounded-lg font-bold shadow bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white text-center transition"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;