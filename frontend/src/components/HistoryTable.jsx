import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAnalysis } from '../features/history/historySlice';

const HistoryTable = () => {
  const { history, loading } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const handleDelete = (analysisId) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      dispatch(deleteAnalysis(analysisId));
    }
  };

  const handleDownload = (analysis) => {
    // This would typically download the chart image
    // For now, we'll just show a message
    alert('Download functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-4 font-bold text-gray-400">H</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis History</h3>
        <p className="text-gray-500">Start by uploading an Excel file and creating your first analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Analysis History</h3>
        <p className="text-sm text-gray-500">Your uploaded files and generated charts</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chart Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Axes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-gray-500">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="text-lg mr-2 font-bold text-gray-600">F</span>
                    {item.originalName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.chartType === '3d' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.chartType?.toUpperCase() || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.xAxis && item.yAxis ? (
                    <span>
                      X: {item.xAxis} | Y: {item.yAxis}
                    </span>
                  ) : (
                    <span className="text-gray-500">Not configured</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable; 