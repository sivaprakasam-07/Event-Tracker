import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast"; // Toaster is now global in App.jsx, but individual toast calls remain
import { Swiper, SwiperSlide } from "swiper/react"; // Corrected import
import "swiper/css"; // Corrected import for Swiper 8+
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios"; // For API calls

export default function MainDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [images, setImages] = useState([]); // Store fetched event images
  const [pamphlets, setPamphlets] = useState([]); // Store fetched pamphlet URLs
  const [carouselItems, setCarouselItems] = useState([]); // Combined carousel items

  // 🖼️ Fetch images & pamphlets on load
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Determine event type based on user role for fetching relevant events
        let eventType = "all"; // Default to all, or handle specific logic if needed
        if (user && user.role) {
          if (user.role.toLowerCase().includes("eng")) {
            eventType = "engineering";
          } else if (user.role.toLowerCase().includes("tech")) {
            eventType = "technology";
          }
        }

        const res = await axios.get(`http://localhost:3000/api/events?eventType=${eventType}`);
        const imageUrls = res.data.events.map((event) => event.imageUrl).filter(Boolean);
        const pamphletUrls = res.data.events.map((event) => event.pamphletUrl).filter(Boolean);

        setCarouselItems([...imageUrls, ...pamphletUrls]);
        setImages(imageUrls); // This state might be redundant if carouselItems is primary
        setPamphlets(pamphletUrls); // This state might be redundant

        if (imageUrls.length === 0 && pamphletUrls.length === 0) {
          // toast.info(\"No images or pamphlets to display currently.\"); // Optional: inform if no media
        }
      } catch (error) {
        console.error("Error fetching media:", error);
        // toast.error(\"⚠️ Failed to load images or pamphlets.\"); // Toast for error is kept
      }
    };

    if (user) { // Fetch media only if user is available
      fetchMedia();
    }
  }, [user]); // Add user as a dependency

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {/* <Toaster /> Removed, Toaster is global in App.jsx */}
      <div className="backdrop-blur-md bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-3xl">
        {/* 🎠 Updated Carousel Section */}
        {carouselItems.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full mb-6"
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  alt={`Event Item ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500 mb-6">No images or pamphlets available for your department.</p>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-6">🎯 Select Your Department</h1>

        {/* 🚀 Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* 🏗️ Engineering Card */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer bg-blue-500 p-6 rounded-xl text-white shadow-md flex items-center justify-center"
            onClick={() => handleNavigate("/engineering")}
          >
            <h2 className="text-2xl font-semibold">🏗️ Engineering</h2>
          </motion.div>

          {/* 🧠 Technology Card */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer bg-purple-500 p-6 rounded-xl text-white shadow-md flex items-center justify-center"
            onClick={() => handleNavigate("/technology")}
          >
            <h2 className="text-2xl font-semibold">🧠 Technology</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
