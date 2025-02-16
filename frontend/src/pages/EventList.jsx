import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch events from the backend
  const getEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/event/getEvents");
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
      await axios.delete(`http://localhost:3000/event/deleteEvent/${eventId}`);
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

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : events.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-700"><strong>📅 Date:</strong> {event.date}</p>
              <p className="text-gray-700"><strong>⏰ Time:</strong> {event.time}</p>
              <p className="text-gray-700"><strong>📍 Venue:</strong> {event.venue}</p>
              <p className="text-gray-700"><strong>🏛 Department:</strong> {event.department}</p>
              <p className="text-gray-700"><strong>🎓 Eligibility:</strong> {event.eligibility}</p>
              <p className="text-gray-600 mt-2">{event.description}</p>

              <div className="mt-4 flex justify-between items-center">
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

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">No events available.</div>
      )}
    </div>
  );
}

export default EventList;
