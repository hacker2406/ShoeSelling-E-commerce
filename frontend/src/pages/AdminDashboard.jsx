import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      {/* Main Content - Added margin-left to account for fixed sidebar */}
      <main className="flex-1 p-10 ml-64">
        <h2 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="mt-4 text-gray-600">
          Welcome to the admin panel. Manage products and users from here.
        </p>
      </main>
    </div>
  );
}
