import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto p-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Streamline Your</span>
            <span className="block text-indigo-600">Event Management</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-700">
            Plan, organize, and execute memorable events with our powerful and easy-to-use platform.
          </p>

          {/* Button with hover and motion effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              to="/login"
              className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
