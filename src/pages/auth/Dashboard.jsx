import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

const Dashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      // Force reload after logout
      window.location.reload(); // This will reload the page
    });
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
