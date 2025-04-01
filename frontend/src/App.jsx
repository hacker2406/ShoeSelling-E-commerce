import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/landing" element={<Landing />} />
          </Route>

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />

        <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin/products/add" element={<AdminAddProduct />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
