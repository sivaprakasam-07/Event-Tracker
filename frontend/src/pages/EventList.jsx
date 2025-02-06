import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]); // Ensure this is initialized as an array
  const { user } = useAuth();

  // Function to fetch events from the backend
  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event/getEvents");

      // Log the response data to confirm the structure
      console.log("API Response:", response.data);

      // Access the events array from the response data
      const eventsData = response.data.events; // Extracting events from the response

      // Check if the eventsData is an array
      if (Array.isArray(eventsData)) {
        setEvents(eventsData);
      } else {
        console.error("Events data is not an array:", eventsData);
        setEvents([]); // Set to empty array if response is not as expected
      }
    } catch (error) {
      console.error("An error occurred while fetching events:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      setEvents([]); // Ensure we don't crash if there's an error
    }
  };

  // Function to delete an event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/event/deleteEvent/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Check if events is an array before mapping */}
        {Array.isArray(events) && events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">Date: {event.date}</p>
              <p className="text-gray-600 mb-2">Time: {event.time}</p>
              <p className="text-gray-600 mb-2">Venue: {event.venue}</p>
              <p className="text-gray-600 mb-2">Department: {event.department}</p>
              <p className="text-gray-600 mb-2">Eligibility: {event.eligibility}</p>
              <p className="text-gray-600 mb-4">{event.description}</p>
              {event.eventLink && (
                <a
                  href={event.eventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-2"
                >
                  Event Link
                </a>
              )}
              {user?.role === 'admin' && (
                <button
                  onClick={() => handleDelete(event._id)}
                  className="block w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-2"
                >
                  Delete Event
                </button>
              )}
            </div>
          ))
        ) : (
          <div>No events available.</div>
        )}
      </div>
    </div>
  );
}

export default EventList;