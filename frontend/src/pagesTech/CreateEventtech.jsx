import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function CreateEvent() {
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedPosterUrl = "";

      // If poster is uploaded, handle upload to Cloudinary
      if (poster) {
        const formData = new FormData();
        formData.append("file", poster);
        formData.append("upload_preset", "your_cloudinary_preset");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          formData
        );
        uploadedPosterUrl = uploadResponse.data.secure_url;
      }

      const eventPayload = {
        ...eventData,
        posterUrl: uploadedPosterUrl || eventData.posterUrl,
      };

      // API call to create event
      const response = await axios.post(
        "http://localhost:3000/event/createEvent",
        eventPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("🎉 Event Created Successfully!");
        setTimeout(() => navigate("/engineering/events"), 3000);
      } else {
        toast.error("⚠️ Failed to create event. Please try again!");
      }
    } catch (err) {
      console.error("Error occurred while creating event:", err);
      toast.error("⚠️ Error creating event. Try again!");
    } finally {
      setLoading(false);
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
              <option value="CSE">CSE</option>
              <option value="CSE-Cyber Security">CSE-Cyber Security</option>
              <option value="IT">IT</option>
              <option value="ADS">ADS</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
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
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-indigo-600"
            } text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300`}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
