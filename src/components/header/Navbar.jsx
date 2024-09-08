import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useAuthStore } from "../../store/authStore"; // Assuming auth store is in this path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { checkAuth, isAuthenticated, isVerified, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white w-full shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-800">
              <img src="/logo3.svg" alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Products
            </Link>

            {isAuthenticated && isVerified ? (
              <Link
                to="/dashboard"
                className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                {user.firstName}
              </Link>
            ) : (
              <Link
                to="/signup"
                className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Signup
              </Link>
            )}

            {isAuthenticated && isVerified ? (
              <Link
                to="/cart"
                className="text-white bg-black p-2 rounded-full text-2xl hover:bg-gray-800 transition-colors"
              >
                <CiShoppingCart />
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Slide-in Mobile Menu */}

        <div
          className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-20`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col px-6 space-y-4 mt-8">
            <Link
              to="/products"
              className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Products
            </Link>

            {isAuthenticated && isVerified ? (
              // Display user name with link to /dashboard
              <Link
                to="/dashboard"
                className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                {user.firstName}
              </Link>
            ) : (
              // Signup button
              <Link
                to="/signup"
                className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Signup
              </Link>
            )}

            {isAuthenticated && isVerified ? (
              <Link
                to="/cart"
                className="flex items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <CiShoppingCart className="font-bold" /> Cart
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
