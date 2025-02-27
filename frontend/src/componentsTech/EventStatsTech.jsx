import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function EventStats() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        setEvents(storedEvents);
    }, []);
    const totalParticipants = events.reduce((acc, event) => acc + (parseInt(event.participants, 10) || 0), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-100 p-6 rounded-lg text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold text-indigo-800">Total Events</h4>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{events.length}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold text-green-800">Upcoming Events</h4>
                <p className="text-3xl font-bold text-green-600 mt-2">{events.filter(event => new Date(`${event.date} ${event.time}`) > new Date()).length}</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold text-purple-800">Past Events</h4>
                <p className="text-3xl font-bold text-purple-600 mt-2">{events.filter(event => new Date(`${event.date} ${event.time}`) <= new Date()).length}</p>
            </div>
        </div>
    );
}

export default EventStats;