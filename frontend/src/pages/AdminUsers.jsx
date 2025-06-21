import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          Manage Users
        </h1>
        {loading ? (
          <div className="text-center text-blue-600 font-semibold py-12 animate-pulse">
            Loading users...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} className="border-b hover:bg-blue-50 transition">
                    <td className="p-3 text-gray-500">{idx + 1}</td>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-700 font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                      {user.name}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          user.isAdmin
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-3">
                      {!user.isAdmin ? (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold shadow transition"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;