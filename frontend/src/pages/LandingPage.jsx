import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useCallback } from "react"; // Added useCallback
import toast, { Toaster } from 'react-hot-toast';
import Particles from "react-tsparticles"; // Added
import { loadSlim } from "tsparticles-slim"; // Added

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const particlesInit = useCallback(async engine => { // Added
    await loadSlim(engine); // Added
  }, []); // Added

  const particlesLoaded = useCallback(async container => { // Added
    await console.log(container); // Added
  }, []); // Added

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
    } else {
      navigate("/login");
      toast.success('Redirecting to login page');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6 relative"> {/* Changed background, added relative positioning */}
      <Particles // Added Particles component
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#111827", // Dark background for particles
            },
          },
          fpsLimit: 240,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2, // Reduced speed
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Reduced number of particles
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto p-10 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg z-10" // Added z-10 to ensure content is above particles, changed bg opacity
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-100 sm:text-5xl md:text-6xl"> {/* Changed text color */}
            <span className="block">St. Joseph's</span>
            <span className="block">Group of Institutions</span>
            <span className="block text-indigo-400">Event Management</span> {/* Changed text color */}
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-300"> {/* Changed text color */}
            Plan, organize, and execute memorable events with our powerful and easy-to-use platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <button
              onClick={handleLoginLogout}
              className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600 transition duration-300" // Adjusted button colors
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;