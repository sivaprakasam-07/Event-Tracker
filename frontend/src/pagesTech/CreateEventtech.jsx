import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function CreateEvent() {
  const { user } = useAuth(); // Get the logged-in user's role

  // Define department options based on the user's role
  const departmentOptions = user.role === "CSETechHod"
    ? ["CSE"]
    : user.role === "CSECyberHod"
    ? ["CSE-Cyber Security"]
    : user.role === "ITTechHod"
    ? ["IT"]
    : user.role === "ADSTechHod"
    ? ["ADS"]
    : user.role === "ECETechHod"
    ? ["ECE"]
    : user.role === "EEETechHod"
    ? ["EEE"]
    : ["CSE", "CSE-Cyber Security", "IT", "ADS", "ECE", "EEE"]; // Default for admins

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    eventLink: "",
    department: "",
    eligibility: "",
    posterUrl: "", // Store uploaded poster URL here
  });

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedPosterUrl = "";

      // If poster is uploaded, handle upload to Firebase
      if (poster) {
        const formData = new FormData();
        formData.append("file", poster);

        const uploadResponse = await axios.post(
          "http://localhost:3000/upload/poster",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        uploadedPosterUrl = uploadResponse.data.url;
      }

      const eventPayload = {
        ...eventData,
        posterUrl: uploadedPosterUrl,
      };

      // API call to create event
      await axios.post("http://localhost:3000/event/createEvent", eventPayload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("🎉 Event Created Successfully!");
      setTimeout(() => navigate("/technology/events"), 3000);
    } catch (err) {
      console.error("Error occurred while creating event:", err);
      toast.error("⚠️ Failed to create event. Try again!");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPreview(URL.createObjectURL(file)); // Generate preview URL
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <Toaster />
      {/* Create Event Form Container */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          📅 Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.title}
              onChange={handleChange}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={eventData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={eventData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.venue}
              onChange={handleChange}
            />
          </div>

          {/* Event Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Link
            </label>
            <input
              type="url"
              name="eventLink"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.eventLink}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.description}
              onChange={handleChange}
            />
          </div>

          {/* Eligibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Eligibility
            </label>
            <textarea
              name="eligibility"
              rows="2"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={eventData.eligibility}
              onChange={handleChange}
            />
          </div>

          {/* File Upload (Poster) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Poster (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500"
              onChange={handleFileChange}
            />
          </div>

          {/* Poster Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Poster Preview:
              </p>
              <img
                src={preview}
                alt="Poster Preview"
                className="w-full h-40 object-contain rounded-lg border"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
