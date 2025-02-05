import { useState, useEffect } from 'react';

function DepartmentStats() {
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const stats = events.reduce((acc, event) => {
      const department = event.department || 'Unknown';
      if (!acc[department]) {
        acc[department] = { events: 0, participants: 0 };
      }
      acc[department].events += 1;
      acc[department].participants += event.participants || 0;
      return acc;
    }, {});

    setDepartmentStats(Object.entries(stats));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {departmentStats.map(([department, { events, participants }]) => (
        <div key={department} className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-800">{department}</h4>
          <p className="text-lg text-gray-600 mt-2">Events: {events}</p>
          <p className="text-lg text-gray-600 mt-2">Participants: {participants}</p>
        </div>
      ))}
    </div>
  );
}

export default DepartmentStats;