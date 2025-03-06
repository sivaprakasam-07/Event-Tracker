import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
            EventTracker
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/technology" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/technology/events" className="nav-link">
                  Events
                </Link>
                {(user.role === "masterAdmin" || user.role === "superAdminTech") && (
                  <Link to="/technology/create-event" className="nav-link">
                    Create Event
                  </Link>
                )}
                {/* Logout Button with Animation */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-indigo-700"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-indigo-700"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
export default Navbar;
