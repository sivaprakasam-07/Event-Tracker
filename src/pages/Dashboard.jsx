import { useAuth } from '../context/AuthContext';
import EventStats from '../components/EventStats';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}!</h2>
        <p className="text-gray-600 mt-2">Here's your event management overview</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <EventStats />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/events"
              className="flex items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <span className="text-indigo-700 font-medium">View All Events</span>
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/create-event"
                className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-green-700 font-medium">Create New Event</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;