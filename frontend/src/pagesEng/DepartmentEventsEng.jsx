import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function DepartmentEvents() {
  const { department } = useParams();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [participantInputs, setParticipantInputs] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event/getEvents');
        const allEvents = response.data.events;
        const filteredEvents = allEvents.filter(event => event.department === department);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [department]);

  const handleParticipantsChange = (e, eventId) => {
    const value = parseInt(e.target.value, 10) || 0;
    setParticipantInputs({ ...participantInputs, [eventId]: value });
  };

  const handleParticipantsSubmit = async (e, eventId) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/event/updateParticipants/${eventId}`, {
        participants: participantInputs[eventId] || 0,
      });

      // Re-fetch events to reflect updated participants count
      const response = await axios.get('http://localhost:3000/event/getEvents');
      const allEvents = response.data.events;
      const filteredEvents = allEvents.filter(event => event.department === department);
      setEvents(filteredEvents);

      toast.success('Participants count updated successfully!');
    } catch (error) {
      console.error('Error updating participants:', error);
      toast.error('Failed to update participants count.');
    }
  };

  const upcomingEvents = events.filter(event => new Date(`${event.date} ${event.time}`) > new Date());
  const pastEvents = events.filter(event => new Date(`${event.date} ${event.time}`) <= new Date());

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen mt-32">
      <Toaster />
      <h2 className="text-3xl font-bold text-center mb-8">{department} Events</h2>
      <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {upcomingEvents.map(event => (
          <div key={event._id} className="shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600">📅 Date: {event.date}</p>
            <p className="text-gray-600">⏰ Time: {event.time}</p>
            <p className="text-gray-600">📍 Venue: {event.venue}</p>
            <p className="text-gray-600">🎓 Eligibility: {event.eligibility}</p>
            <p className="text-gray-600 mt-2">{event.description}</p>
            {event.eventLink && (
              <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Event Link
              </a>
            )}
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold mb-4">Past Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastEvents.map(event => (
          <div key={event._id} className="shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600">📅 Date: {event.date}</p>
            <p className="text-gray-600">⏰ Time: {event.time}</p>
            <p className="text-gray-600">📍 Venue: {event.venue}</p>
            <p className="text-gray-600">🎓 Eligibility: {event.eligibility}</p>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-gray-800 font-bold mt-2">👥 Participants: {event.participants || 0}</p>
            {event.eventLink && (
              <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Event Link
              </a>
            )}
            {user?.role === 'admin' && (
              <form onSubmit={(e) => handleParticipantsSubmit(e, event._id)} className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Add Participants</label>
                <input
                  type="number"
                  value={participantInputs[event._id] || ''}
                  onChange={(e) => handleParticipantsChange(e, event._id)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  required
                />
                <button type="submit" className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
                  Add Participants
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentEvents;
