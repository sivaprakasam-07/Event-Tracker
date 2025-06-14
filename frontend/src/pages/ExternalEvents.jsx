// src/pages/ExternalEvents.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ExternalEvents = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/scrape/knowafest-hackathons")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((apiResponse) => {
                if (apiResponse.success && Array.isArray(apiResponse.data)) {
                    setEvents(apiResponse.data);
                } else {
                    throw new Error(apiResponse.message || "Invalid data format from API");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        // Removed outer Fragment and call to renderNavbar
        // Adjusted padding: py-12 (original top and bottom padding)
        <div className="min-h-screen bg-gradient-to-b from-[#eef1ff] to-white px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)} // Navigate back
                    className="mb-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    External Hackathons from Knowafest 🚀
                </h1>
                {loading ? (
                    <p className="text-center text-gray-600 text-xl">Loading events...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-xl">Error: {error}</p>
                ) : events.length === 0 ? (
                    <p className="text-center text-gray-600 text-xl">No hackathons found at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <div
                                key={`${event.name}-${index}`}
                                className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-semibold mb-3 text-indigo-700">
                                    {event.name}
                                </h2>
                                <p className="text-sm text-gray-500 mb-1">
                                    <strong>Date:</strong> {event.startDate}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    <strong>College:</strong> {event.collegeName}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    <strong>City:</strong> {event.city}
                                </p>
                                <a
                                    href={event.eventPageLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-sm"
                                >
                                    View Event Details
                                </a>
                                <p className="text-xs text-gray-400 mt-4">
                                    Source: {event.source}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExternalEvents;
