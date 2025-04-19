import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />; // Redirect if not logged in
  if (role === "admin" && !user.isAdmin) return <Navigate to="/landing" replace />; // Non-admins can't access admin routes

  return <Outlet />;
};

export default ProtectedRoute;
