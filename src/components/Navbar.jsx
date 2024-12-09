import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-indigo-600">EventTracker</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Dashboard
                </Link>
                <Link to="/events" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Events
                </Link>
                {user.role === 'admin' && (
                  <Link to="/create-event" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                    Create Event
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;