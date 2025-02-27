import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

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
    });

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/event/createEvent", eventData, {
                headers: { "Content-Type": "application/json" },
            });

            toast.success("🎉 Event Created Successfully!");

            // ⏳ Redirect after a short delay
            setTimeout(() => navigate("/events"), 3500);
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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
            <Toaster />
            {/* Create Event Form */}
            <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    📅 Create New Event
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={eventData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                name="time"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={eventData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Venue */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.venue}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Event Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Link</label>
                        <input
                            type="url"
                            name="eventLink"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.eventLink}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.department}
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ADS">ADS</option>
                            <option value="AIML">AIML</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="Bio-Tech">Bio-Technology</option>
                            <option value="Chemical">Chemical Engineering</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Eligibility */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                        <textarea
                            name="eligibility"
                            rows="2"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={eventData.eligibility}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
