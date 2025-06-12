// src/pages/ExternalEvents.jsx
import React, { useEffect, useState } from "react";

const ExternalEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/scraped-events?type=hackathon")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#eef1ff] to-white px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">
                    External Hackathons from Devpost 🚀
                </h1>
                {events.length === 0 ? (
                    <p className="text-center text-gray-600">Loading events...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white shadow-lg rounded-2xl p-6 border hover:scale-[1.02] transition"
                            >
                                <h2 className="text-xl font-semibold mb-2 text-[#333]">
                                    {event.title}
                                </h2>
                                <a
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 font-medium underline"
                                >
                                    View Event
                                </a>
                                <p className="text-sm text-gray-500 mt-2">
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
