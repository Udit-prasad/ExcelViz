import React from 'react';
import { useSelector } from 'react-redux';

const ProfileCard = ({ user }) => {
  const stats = {
    totalAnalyses: 0,
    chartsCreated: 0,
    lastActive: 'Today',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
        <p className="text-gray-500">{user?.email}</p>
        <div className="mt-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user?.isAdmin 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {user?.isAdmin ? 'Administrator' : 'User'}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Account Statistics</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Analyses</span>
            <span className="text-sm font-medium text-gray-900">{stats.totalAnalyses}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Charts Created</span>
            <span className="text-sm font-medium text-gray-900">{stats.chartsCreated}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Active</span>
            <span className="text-sm font-medium text-gray-900">{stats.lastActive}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard; 