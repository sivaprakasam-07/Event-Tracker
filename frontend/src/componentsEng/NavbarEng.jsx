import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClasses = "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-blue-800 md:dark:hover:text-blue dark:hover:bg-blue-700 dark:hover:text-black md:dark:hover:bg-transparent";
  const activeNavLinkClasses = "block py-2 px-3 text-white bg-indigo-600 rounded md:bg-transparent md:text-indigo-600 md:p-0 dark:text-white"; // Example active style

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
            EventTracker <span className="text-sm font-medium text-gray-600">(Eng)</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/engineering" className={navLinkClasses}>
                  Dashboard
                </Link>
                <Link to="/engineering/events" className={navLinkClasses}>
                  Events
                </Link>
                <Link to="/external-events" className={navLinkClasses} state={{ from: '/engineering' }}>
                  External Events
                </Link>
                {(user.role === "masterAdmin" || user.role === "superAdminEng" || user.role.endsWith("EngHod")) && (
                  <Link to="/engineering/create-event" className={navLinkClasses}>
                    Create Event
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link to="/engineering" className={navLinkClasses} onClick={toggleMobileMenu}>
                    Dashboard
                  </Link>
                  <Link to="/engineering/events" className={navLinkClasses} onClick={toggleMobileMenu}>
                    Events
                  </Link>
                  <Link to="/external-events" className={navLinkClasses} state={{ from: '/engineering' }} onClick={toggleMobileMenu}>
                    External Events
                  </Link>
                  {(user.role === "masterAdmin" || user.role === "superAdminEng" || user.role.endsWith("EngHod")) && (
                    <Link to="/engineering/create-event" className={navLinkClasses} onClick={toggleMobileMenu}>
                      Create Event
                    </Link>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout} // handleLogout already closes menu
                    className="w-full text-left mt-2 bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={navLinkClasses} // Use navLinkClasses for consistency
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
export default Navbar;
