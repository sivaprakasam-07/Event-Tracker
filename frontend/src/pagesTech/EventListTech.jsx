import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaTrash, FaChevronDown } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { user } = useAuth();

    // Fetch events from the backend
    const getEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3000/event/getEvents?eventType=Tech"); // Added eventType query param
            const eventsData = response.data.events;

            if (Array.isArray(eventsData)) {
                setEvents(eventsData);
            } else {
                setError("Invalid event data received.");
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to load events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Delete an event
    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:3000/event/deleteEvent/${eventId}?eventType=Tech`); // Added eventType query param
            setEvents(events.filter((event) => event._id !== eventId));
            toast.success("🗑️ Event Deleted Successfully!");
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("⚠️ Failed to delete event. Try again!");
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const departments = [
        "All Departments",
        "CSE",
        "CSE-Cyber Security",
        "IT",
        "ADS",
        "ECE",
        "EEE",
    ];

    const filteredEvents = selectedDepartment && selectedDepartment !== "All Departments"
        ? events.filter(event => event.department === selectedDepartment)
        : events;

    return (
        <div className="min-h-screen pt-20 p-8 bg-gray-100">
            <Toaster />
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center text-gray-900 mb-8"
            >
                Upcoming Events 📅
            </motion.h2>

            {/* Custom Dropdown */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mb-6 max-w-xs"
            >
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full bg-white/50 backdrop-blur-lg border border-gray-300 shadow-lg px-4 py-2 rounded-lg flex justify-between items-center text-gray-900 font-medium hover:bg-white/80 transition-all"
                >
                    {selectedDepartment || "Select Department"}
                    <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0 w-full bg-white/80 backdrop-blur-lg shadow-xl border border-gray-300 rounded-lg mt-2 overflow-hidden z-20"
                        >
                            {departments.map((dept) => (
                                <motion.li
                                    key={dept}
                                    onClick={() => {
                                        setSelectedDepartment(dept === "All Departments" ? "" : dept);
                                        setDropdownOpen(false);
                                    }}
                                    whileHover={{ backgroundColor: "#f0f0f0" }}
                                    className="px-4 py-2 cursor-pointer text-gray-900 hover:bg-gray-100 transition-all"
                                >
                                    {dept}
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.div>

            {loading ? (
                <div className="text-center text-gray-600 text-lg">Loading events...</div>
            ) : error ? (
                <div className="text-center text-red-500 text-lg">{error}</div>
            ) : filteredEvents.length > 0 ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white/50 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-200"
                        >
                            {/* Show poster image on card if available */}
                            {event.posterUrl && (
                                <img
                                    src={event.posterUrl}
                                    alt="Event Poster"
                                    className="w-full h-48 object-contain rounded-lg border mb-4"
                                />
                            )}
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-gray-700"><strong>📅 Date:</strong> {event.date}</p>
                            <p className="text-gray-700"><strong>⏰ Time:</strong> {event.time}</p>
                            <p className="text-gray-700"><strong>📍 Venue:</strong> {event.venue}</p>
                            <p className="text-gray-700"><strong>🏛 Department:</strong> {event.department}</p>
                            <p className="text-gray-700"><strong>🎓 Eligibility:</strong> {event.eligibility}</p>
                            <p className="text-gray-600 mt-2">{event.description}</p>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex gap-2">
                                    {event.eventLink && (
                                        <a
                                            href={event.eventLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                                        >
                                            <FaExternalLinkAlt className="mr-2" /> Event Link
                                        </a>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setModalOpen(true);
                                        }}
                                        className="inline-flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
                                    >
                                        View More
                                    </button>
                                </div>
                                {user && (
                                    (user.role === "masterAdmin" ||
                                        user.role === "superAdminTech" ||
                                        (user.role.endsWith("TechHod") && user.role.startsWith(event.department))) && (
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                                        >
                                            <FaTrash className="mr-2" /> Delete
                                        </button>
                                    )
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg">No events available.</div>
            )}

            {/* Modal for poster */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setModalOpen(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">{selectedEvent?.title}</h2>
                        {selectedEvent?.posterUrl ? (
                            <img
                                src={selectedEvent.posterUrl}
                                alt="Event Poster"
                                className="w-full h-96 object-contain rounded-lg border"
                            />
                        ) : (
                            <div className="text-gray-500 text-center py-10">No poster available for this event.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventList;
