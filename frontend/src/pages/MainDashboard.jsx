import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
// Removed Swiper imports
import Particles from "react-tsparticles"; // Added
import { loadSlim } from "tsparticles-slim"; // Added
import axios from "axios"; // For API calls

export default function MainDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  // 🚀 Handle Navigation Based on Role
  const handleNavigate = (path) => {
    if (user.role === "masterAdmin") {
      navigate(path); // Master admin has access to all sections
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 relative">
      <Particles
        id="tsparticles-dashboard"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#111827",
            },
          },
          fpsLimit: 120,
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
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
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
      <div className="backdrop-blur-md bg-white/5 p-10 rounded-2xl shadow-lg text-center w-full max-w-3xl z-10">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
          🎯 Select Your College
        </h1>

        {/* 🚀 Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* 🏗️ Engineering Card */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer bg-blue-600 p-6 rounded-xl text-white shadow-md flex items-center justify-center hover:bg-blue-700"
            onClick={() => handleNavigate("/engineering")}
          >
            <h2 className="text-2xl font-semibold">🏗️ Engineering</h2>
          </motion.div>

          {/* 🧠 Technology Card */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer bg-purple-600 p-6 rounded-xl text-white shadow-md flex items-center justify-center hover:bg-purple-700"
            onClick={() => handleNavigate("/technology")}
          >
            <h2 className="text-2xl font-semibold">🧠 Technology</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
