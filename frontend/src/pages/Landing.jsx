import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
      <p className="text-gray-600">This is the user landing page.</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Landing;
