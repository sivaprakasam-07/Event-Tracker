import React from 'react';

function LoginCredentials() {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Login Credentials</h3>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Admin Access</h4>
          <div className="space-y-2">
            <p className="text-blue-700">
              <span className="font-medium">Username:</span> admin
            </p>
            <p className="text-blue-700">
              <span className="font-medium">Password:</span> admin123
            </p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <h4 className="text-lg font-semibold text-green-800 mb-2">User Access</h4>
          <div className="space-y-2">
            <p className="text-green-700">
              <span className="font-medium">Username:</span> user
            </p>
            <p className="text-green-700">
              <span className="font-medium">Password:</span> user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCredentials;