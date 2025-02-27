import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainDashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="backdrop-blur-md bg-white p-10 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Department</h1>
                <div className="flex space-x-6">
                    {/* Engineering Card */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer bg-blue-500 p-6 rounded-xl text-white shadow-md"
                        onClick={() => navigate("/engineering")}
                    >
                        <h2 className="text-2xl font-semibold">Engineering</h2>
                    </motion.div>

                    {/* Technology Card */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer bg-purple-500 p-6 rounded-xl text-white shadow-md"
                        onClick={() => navigate("/technology")}
                    >
                        <h2 className="text-2xl font-semibold">Technology</h2>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
