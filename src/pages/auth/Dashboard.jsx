import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout} className="bg-black text-white px-3 py-2 rounded-md hover:opacity-80 transition">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
