import { useAuth } from '../context/AuthContext';

function ProfileSection() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-600 rounded-full p-4">
          <span className="text-2xl text-white">{user.username[0].toUpperCase()}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.username}</h3>
          <p className="text-gray-600">Role: {user.role === 'admin' ? 'Administrator' : 'Regular User'}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <h4 className="font-medium mb-2">Account Details</h4>
        <ul className="space-y-2 text-gray-600">
          <li>Account Type: {user.role === 'admin' ? 'Full Access' : 'Standard Access'}</li>
          <li>Permissions: {user.role === 'admin' ? 'Create, Edit, Delete Events' : 'View Events'}</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSection;