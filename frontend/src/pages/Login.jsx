import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Username</label>
            <input
              type="text"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
