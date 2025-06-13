import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Your custom Auth context

function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Role-based department dropdown
  const departmentOptions = user?.role === "CSETechHod"
    ? ["CSE"]
    : user?.role === "CSECyberHod"
    ? ["CSE-Cyber Security"]
    : user?.role === "ITTechHod"
    ? ["IT"]
    : user?.role === "ADSTechHod"
    ? ["ADS"]
    : user?.role === "ECETechHod"
    ? ["ECE"]
    : user?.role === "EEETechHod"
    ? ["EEE"]
    : ["CSE", "CSE-Cyber Security", "IT", "ADS", "ECE", "EEE"]; // Default for admin

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    eventLink: "",
    department: "",
    eligibility: "",
    posterUrl: "", // Will be filled after image upload
  });

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedPosterUrl = "";

      // Upload poster to backend -> Cloudinary
      if (poster) {
        const formData = new FormData();
        formData.append("file", poster);

        const uploadResponse = await axios.post(
          "http://localhost:3000/api/upload/poster", // Ensure this is your working backend route
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        uploadedPosterUrl = uploadResponse.data.secure_url;
      }

      // Prepare final payload
      const payload = {
        ...eventData,
        posterUrl: uploadedPosterUrl || eventData.posterUrl,
      };

      const response = await axios.post(
        "http://localhost:3000/event/createEvent",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("🎉 Event Created Successfully!");
        setTimeout(() => navigate("/technology/events"), 3000);
      } else {
        toast.error("⚠️ Failed to create event. Please try again!");
      }
    } catch (err) {
      console.error("Error while creating event:", err);
      toast.error("⚠️ Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <Toaster />
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
              value={eventData.title}
              onChange={handleChange}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500"
              value={eventData.eligibility}
              onChange={handleChange}
            />
          </div>

          {/* Poster Upload */}
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

          {/* Preview */}
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

          {/* Submit */}
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
