import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Added useEffect
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext"; // Added useAuth

function LandingPage() {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Replaced with AuthContext
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  const handleLoginLogout = () => {
    if (user) { // Check if user exists (is logged in)
      logout(navigate); // Use logout from AuthContext, which handles navigation
      // toast.success('Logged out successfully'); // Toast is handled in AuthContext or can be added here if preferred
    } else {
      navigate("/login");
      // toast.success('Redirecting to login page'); // Optional: toast can be shown on Login page itself
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 rounded-2xl bg-white/30 backdrop-blur-lg shadow-xl border border-gray-200"
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
            <span className="block">St. Joseph's</span>
            <span className="block">Group of Institutions</span>
            <span className="block text-indigo-600">Event Management</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-base sm:text-lg text-gray-700">
            Plan, organize, and execute memorable events with our powerful and easy-to-use platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 sm:mt-8"
          >
            <button
              onClick={handleLoginLogout}
              className="inline-block px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-medium text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {user ? 'Logout' : 'Login / Register'} {/* Changed button text based on user state */}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;