import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Hero from "../components/header/Hero";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div>
      <Navbar />
      {isHomePage && <Hero />}
      <div className="container min-h-[80vh] mx-auto px-4 py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
