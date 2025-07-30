import React from 'react';

const InsightCard = () => {
  const insights = [
    {
      id: 1,
      type: 'trend',
      title: 'Data Trend Detected',
      description: 'Your sales data shows a 15% increase over the last quarter.',
      icon: 'T',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Potential Anomaly',
      description: 'Unusual spike detected in March revenue data.',
      icon: 'A',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Chart Recommendation',
      description: 'Line chart would better visualize your time-series data.',
      icon: 'R',
      color: 'bg-blue-100 text-blue-800',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        <span className="text-sm text-gray-500">Powered by AI</span>
      </div>

      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{insight.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${insight.color}`}>
                    {insight.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2 font-bold text-gray-400">A</div>
          <p className="text-gray-500">No insights available</p>
          <p className="text-sm text-gray-400">Upload data to get AI-powered insights</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
          Generate New Insights
        </button>
      </div>
    </div>
  );
};

export default InsightCard; 