import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DepartmentEvents() {
  const { department } = useParams();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents.filter(event => event.department === department));
  }, [department]);

  const handleParticipantsChange = (e, eventId) => {
    const value = parseInt(e.target.value, 10);
    setEvents(events.map(event => event.id === eventId ? { ...event, participants: value } : event));
  };

  const handleParticipantsSubmit = (e, eventId) => {
    e.preventDefault();
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: parseInt(event.participants, 10),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.success('Participants count updated successfully!');
  };

  const upcomingEvents = events.filter(event => new Date(`${event.date} ${event.time}`) > new Date());
  const pastEvents = events.filter(event => new Date(`${event.date} ${event.time}`) <= new Date());

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{department} Events</h2>
      <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {upcomingEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">Date: {event.date}</p>
            <p className="text-gray-600 mb-2">Time: {event.time}</p>
            <p className="text-gray-600 mb-2">Venue: {event.venue}</p>
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
          </div>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-2">Past Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">Date: {event.date}</p>
            <p className="text-gray-600 mb-2">Time: {event.time}</p>
            <p className="text-gray-600 mb-2">Venue: {event.venue}</p>
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
              <form onSubmit={(e) => handleParticipantsSubmit(e, event.id)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Add Participants</label>
                  <input
                    type="number"
                    value={event.participants || ''}
                    onChange={(e) => handleParticipantsChange(e, event.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
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