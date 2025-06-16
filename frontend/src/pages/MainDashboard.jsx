import { useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function MainDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const handleNavigate = (path) => {
    if (user.role === "masterAdmin") {
      navigate(path);
      return;
    }
    if (user.role === "superAdminTech" && path === "/engineering") {
      return toast.error("❌ You don't have access to this section.");
    }
    if (user.role === "superAdminEng" && path === "/technology") {
      return toast.error("❌ You don't have access to this section.");
    }
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
      <Particles
        id="tsparticles-dashboard"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "#111827" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      <Toaster />

      {/* 👇 Redesigned Center Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-md z-10 text-center">
        <h2 className="text-white text-2xl font-bold mb-6">Select Your College</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Engineering Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("/engineering")}
            className="w-40 py-3 bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-400 transition-all duration-300"
          >
            Engineering
          </motion.button>

          {/* Technology Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("/technology")}
            className="w-40 py-3 bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-pink-400 transition-all duration-300"
          >
            Technology
          </motion.button>
        </div>
      </div>
    </div>
  );
}
