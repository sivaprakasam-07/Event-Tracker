// src/pages/ExternalEvents.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExternalEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchDevpostEvents = fetch("http://localhost:3000/api/scraped-events?type=hackathon")
            .then((res) => {
                if (!res.ok) throw new Error(`Devpost API error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                // Assuming Devpost data is an array of events and might need a source property
                // And assuming it has _id, title, url
                return data.map(event => ({ ...event, source: event.source || 'Devpost' }));
            });

        const fetchKnowafestEvents = fetch("http://localhost:3000/api/scrape/knowafest-hackathons")
            .then((res) => {
                if (!res.ok) throw new Error(`Knowafest API error! status: ${res.status}`);
                return res.json();
            })
            .then(apiResponse => {
                if (apiResponse.success && Array.isArray(apiResponse.data)) {
                    // Knowafest data already has a source property
                    return apiResponse.data;
                }
                throw new Error(apiResponse.message || "Invalid data format from Knowafest API");
            });

        Promise.allSettled([fetchDevpostEvents, fetchKnowafestEvents])
            .then(results => {
                const combinedEvents = [];
                let fetchError = null;

                results.forEach(result => {
                    if (result.status === 'fulfilled') {
                        combinedEvents.push(...result.value);
                    } else {
                        console.error("Error fetching one of the event sources:", result.reason);
                        if (!fetchError) fetchError = result.reason.message; // Store first error
                    }
                });

                setEvents(combinedEvents);
                if (fetchError && combinedEvents.length === 0) {
                    setError(fetchError); // If all fetches failed or one failed and others were empty
                } else if (fetchError) {
                    // Partial success, maybe show a non-blocking warning later or log it
                    console.warn("Some event sources failed to load:", fetchError)
                }
                setLoading(false);
            });

    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eef1ff] to-white px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    External Hackathons 🚀
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
                                // Use a more robust key if _id is available from both sources, otherwise combine name/title and index
                                key={event._id || `${(event.title || event.name)}-${index}`}
                                className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-semibold mb-3 text-indigo-700">
                                    {event.title || event.name} {/* Display title or name */}
                                </h2>
                                {/* Display other common or specific fields if available */}
                                {event.startDate && (
                                    <p className="text-sm text-gray-500 mb-1">
                                        <strong>Date:</strong> {event.startDate}
                                    </p>
                                )}
                                {event.collegeName && (
                                    <p className="text-sm text-gray-500 mb-1">
                                        <strong>College:</strong> {event.collegeName}
                                    </p>
                                )}
                                {event.city && (
                                    <p className="text-sm text-gray-500 mb-4">
                                        <strong>City:</strong> {event.city}
                                    </p>
                                )}
                                <a
                                    href={event.url || event.eventPageLink} // Use url or eventPageLink
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
