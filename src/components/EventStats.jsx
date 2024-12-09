import { useState, useEffect } from 'react';

function EventStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0
  });

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const now = new Date();
    
    setStats({
      totalEvents: events.length,
      upcomingEvents: events.filter(event => new Date(`${event.date} ${event.time}`) > now).length,
      pastEvents: events.filter(event => new Date(`${event.date} ${event.time}`) <= now).length
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-indigo-100 p-6 rounded-lg text-center">
        <h4 className="text-xl font-semibold text-indigo-800">Total Events</h4>
        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalEvents}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg text-center">
        <h4 className="text-xl font-semibold text-green-800">Upcoming Events</h4>
        <p className="text-3xl font-bold text-green-600 mt-2">{stats.upcomingEvents}</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg text-center">
        <h4 className="text-xl font-semibold text-purple-800">Past Events</h4>
        <p className="text-3xl font-bold text-purple-600 mt-2">{stats.pastEvents}</p>
      </div>
    </div>
  );
}

export default EventStats;