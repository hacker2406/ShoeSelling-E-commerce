import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="mt-4 text-gray-600">Welcome to the admin panel. Manage products and users from here.</p>
      </main>
    </div>
  );
}
