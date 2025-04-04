import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Voting Statistics</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-medium">Total Votes:</span> 0</p>
            <p><span className="font-medium">Voting Accuracy:</span> N/A</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Settings</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Voting History</h2>
        <p className="text-gray-600">You haven't made any votes yet. Start voting to see your history here!</p>
      </div>
    </div>
  );
};

export default ProfilePage;