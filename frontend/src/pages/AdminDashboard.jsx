import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await axios.get("http://localhost:5000/api/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch {
        setStats(null);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-blue-600 font-semibold text-lg animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-red-500 font-semibold py-12">
        Failed to load dashboard stats.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      {/* Main Content - Added margin-left to account for fixed sidebar */}
      <main className="flex-1 p-10 ml-64 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
            Admin Dashboard
          </h1>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <DashboardCard label="Total Sales" value={`₹${stats.totalSales}`} icon="💰" />
            <DashboardCard label="Total Orders" value={stats.totalOrders} icon="🛒" />
            <DashboardCard label="Pending Orders" value={stats.pendingOrders} icon="⏳" />
            <DashboardCard label="Total Users" value={stats.totalUsers} icon="👥" />
          </div>
          {/* Top Products & Low Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-700">Top Selling Products</h2>
              {stats.topProducts.length === 0 ? (
                <div className="text-gray-400">No data</div>
              ) : (
                <ul>
                  {stats.topProducts.map((prod) => (
                    <li key={prod._id} className="flex justify-between py-2 border-b last:border-b-0">
                      <span>{prod.name}</span>
                      <span className="font-bold text-blue-700">{prod.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-700">Low Stock Alerts</h2>
              {stats.lowStock.length === 0 ? (
                <div className="text-gray-400">No low stock products</div>
              ) : (
                <ul>
                  {stats.lowStock.map((prod) => (
                    <li key={prod._id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                      <img src={prod.images[0]?.url} alt={prod.name} className="w-8 h-8 object-cover rounded" />
                      <span>{prod.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Recent Orders & Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-700">Recent Orders</h2>
              {stats.recentOrders.length === 0 ? (
                <div className="text-gray-400">No recent orders</div>
              ) : (
                <ul>
                  {stats.recentOrders.map((order) => (
                    <li key={order._id} className="flex justify-between py-2 border-b last:border-b-0">
                      <span>
                        #{order._id.slice(-6).toUpperCase()} by {order.user?.name || "N/A"}
                      </span>
                      <span className="font-semibold text-blue-700">₹{order.total}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-700">Recent Users</h2>
              {stats.recentUsers.length === 0 ? (
                <div className="text-gray-400">No recent users</div>
              ) : (
                <ul>
                  {stats.recentUsers.map((user) => (
                    <li key={user._id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-700 font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function DashboardCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-blue-700">{value}</div>
      <div className="text-gray-500 mt-2">{label}</div>
    </div>
  );
}

export default AdminDashboard;
