import { useState, useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Particles from "react-tsparticles"; // Added
import { loadSlim } from "tsparticles-slim"; // Added
import Button from '@mui/material/Button'; // Added Button

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const credentials = [
    { username: "MasterAdmin", password: "masteradmin123", role: "masterAdmin" },
    { username: "SuperAdminEng", password: "superadmineng123", role: "superAdminEng" },
    { username: "SuperAdminTech", password: "superadmintech123", role: "superAdminTech" },
    { username: "CSEEngHod", password: "cseenghod123", role: "CSEEngHod" },
    { username: "ITEngHod", password: "itenghod123", role: "ITEngHod" },
    { username: "ADSEngHod", password: "adsenghod123", role: "ADSengHod" },
    { username: "AIMLEngHod", password: "aimlenghod123", role: "AIMLEngHod" },
    { username: "ECEEngHod", password: "eceenghod123", role: "ECEEngHod" },
    { username: "EEEEngHod", password: "eeeenghod123", role: "EEEEngHod" },
    { username: "BTEngHod", password: "btenghod123", role: "BioTechEngHod" },
    { username: "ChemEngHod", password: "chemenghod123", role: "ChemicalEngHod" },
    { username: "CseTechHod", password: "csetechhod123", role: "CSETechHod" },
    { username: "CyberTechHod", password: "cybertechhod123", role: "CSECyberHod" },
    { username: "ITTechHod", password: "ittechhod123", role: "ITTechHod" },
    { username: "ADSTechHod", password: "adstechhod123", role: "ADSTechHod" },
    { username: "ECETechHod", password: "ecetechhod123", role: "ECETechHod" },
    { username: "EEETechHod", password: "eeetechhod123", role: "EEETechHod" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      login({ username: user.username, role: user.role });
      toast.success("Logged in successfully", { duration: 4000 });
      navigate("/main-dashboard");
    } else {
      toast.error("Invalid username or password", { duration: 4000 });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 relative">
      <Particles
        id="tsparticles"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md shadow-lg rounded-2xl p-8 z-10"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-100 mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-sm font-medium">Username</label>
            <input
              type="text"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button> */}
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2, // Adjusted padding
              borderColor: 'indigo.500', // Indigo border
              color: 'indigo.500', // Indigo text
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)', // Light indigo background on hover
                borderColor: 'indigo.600',
              },
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
