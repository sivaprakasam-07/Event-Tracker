import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function MainDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [images, setImages] = useState([]); // Placeholder for carousel images

    const handleNavigate = (path) => {
        if (user.role === "masterAdmin") {
            navigate(path); // Master admin has access to all sections
            return;
        }
        if (user.role === "superAdminTech" && path === "/engineering") {
            return toast.error("You don't have access to this section.");
        }
        if (user.role === "superAdminEng" && path === "/technology") {
            return toast.error("You don't have access to this section.");
        }
        navigate(path);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <Toaster />
            <div className="backdrop-blur-md bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-3xl">
                {/* Carousel Section at the Top */}
                {images.length > 0 && (
                    <Swiper spaceBetween={10} slidesPerView={1} className="w-full mb-6">
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Department</h1>

                {/* Updated Card Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {/* Engineering Card */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer bg-blue-500 p-6 rounded-xl text-white shadow-md flex items-center justify-center"
                        onClick={() => handleNavigate("/engineering")}
                    >
                        <h2 className="text-2xl font-semibold">Engineering</h2>
                    </motion.div>

                    {/* Technology Card */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer bg-purple-500 p-6 rounded-xl text-white shadow-md flex items-center justify-center"
                        onClick={() => handleNavigate("/technology")}
                    >
                        <h2 className="text-2xl font-semibold">Technology</h2>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
