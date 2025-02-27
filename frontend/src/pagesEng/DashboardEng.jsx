import { useAuth } from "../context/AuthContext";
import EventStats from "../componentsEng/EventStatsEng";
import DepartmentStats from "../componentsEng/DepartmentStatsEng";
import ExcelUpload from "../componentsEng/ExcelUploadEng";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast"; // Re-added Toaster import

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-8"> {/* Added pt-20 to prevent navbar overlap */}
      <Toaster />
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-gray-900">Welcome, {user.username}! 🎉</h2>
        <p className="text-gray-600 mt-2">Here’s your event management overview</p>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EventStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DepartmentStats />
        </motion.div>
      </div>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-7xl mx-auto mt-10 bg-white/50 backdrop-blur-lg shadow-lg rounded-xl p-6"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/events"
            className="flex items-center justify-center p-4 bg-gray-200/50 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            <span className="text-gray-900 font-medium">📅 View All Events</span>
          </Link>

          {user.role === "admin" && (
            <Link
              to="/create-event"
              className="flex items-center justify-center p-4 bg-gray-200/50 rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              <span className="text-gray-900 font-medium">➕ Create New Event</span>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Excel Upload Section */}
      {/* Excel Upload Section - Only for Admins */}
      {user.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-7xl mx-auto mt-10 bg-white/50 backdrop-blur-lg shadow-lg rounded-xl p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Excel Sheet</h3>
          <ExcelUpload />
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
