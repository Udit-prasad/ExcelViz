import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory } from '../features/history/historySlice';
import ProfileCard from '../components/ProfileCard';
import InsightCard from '../components/InsightCard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { history } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const stats = {
    totalAnalyses: history.length,
    recentAnalyses: history.slice(0, 5).length,
    chartTypes: [...new Set(history.map(item => item.chartType))].length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl font-bold text-blue-600">A</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Analyses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAnalyses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl font-bold text-green-600">R</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Analyses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentAnalyses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl font-bold text-purple-600">C</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chart Types</p>
              <p className="text-2xl font-bold text-gray-900">{stats.chartTypes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>

        {/* Insights and Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <InsightCard />
          
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.slice(0, 5).map((item) => (
                  <div key={item._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <span className="text-lg font-bold text-gray-600">F</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()} - {item.chartType} chart
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2 font-bold text-gray-400">A</div>
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400">Start by uploading an Excel file</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 