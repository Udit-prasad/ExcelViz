import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileUpload from '../components/FileUpload';
import Chart2D from '../components/Chart2D';
import Chart3D from '../components/Chart3D';
import { setChartType, setXAxis, setYAxis, saveAnalysis } from '../features/analysis/analysisSlice';

const Analysis = () => {
  const dispatch = useDispatch();
  const { 
    uploadedFile, 
    columns, 
    analysisData, 
    chartData, 
    chartType, 
    xAxis, 
    yAxis, 
    loading 
  } = useSelector((state) => state.analysis);

  const [showChart, setShowChart] = useState(false);

  const handleChartTypeChange = (type) => {
    dispatch(setChartType(type));
  };

  const handleAxisChange = (axis, value) => {
    if (axis === 'x') {
      dispatch(setXAxis(value));
    } else {
      dispatch(setYAxis(value));
    }
  };

  const handleGenerateChart = () => {
    if (!xAxis || !yAxis) {
      alert('Please select both X and Y axes');
      return;
    }

    // Mock chart data - in real app, this would come from backend
    const mockChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: yAxis,
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };

    setShowChart(true);
    // In real app, dispatch generateChart action here
  };

  const handleSaveAnalysis = () => {
    if (!showChart) {
      alert('Please generate a chart first');
      return;
    }

    const analysisData = {
      fileName: uploadedFile,
      chartType,
      xAxis,
      yAxis,
      chartData: 'mock-data',
    };

    dispatch(saveAnalysis(analysisData));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
        <p className="text-gray-600">Upload Excel files and create interactive visualizations</p>
      </div>

      {/* File Upload Section */}
      {!uploadedFile && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Upload Excel File</h2>
          <FileUpload />
        </div>
      )}

      {/* Chart Configuration */}
      {uploadedFile && columns.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Configure Chart</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chart Type
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleChartTypeChange('2d')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartType === '2d'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  2D Charts
                </button>
                <button
                  onClick={() => handleChartTypeChange('3d')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartType === '3d'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  3D Charts
                </button>
              </div>
            </div>

            {/* 2D Chart Type Selection */}
            {chartType === '2d' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2D Chart Style
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                  <option value="doughnut">Doughnut Chart</option>
                </select>
              </div>
            )}
          </div>

          {/* Axis Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X-Axis (Categories)
              </label>
              <select
                value={xAxis}
                onChange={(e) => handleAxisChange('x', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select X-Axis</option>
                {columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y-Axis (Values)
              </label>
              <select
                value={yAxis}
                onChange={(e) => handleAxisChange('y', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Y-Axis</option>
                {columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Chart Button */}
          <div className="mt-6">
            <button
              onClick={handleGenerateChart}
              disabled={!xAxis || !yAxis || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Chart'}
            </button>
          </div>
        </div>
      )}

      {/* Chart Display */}
      {showChart && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Generated Chart</h2>
            <button
              onClick={handleSaveAnalysis}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Analysis
            </button>
          </div>
          
          {chartType === '2d' ? (
            <Chart2D 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                  label: yAxis,
                  data: [12, 19, 3, 5, 2],
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                  borderColor: 'rgba(59, 130, 246, 1)',
                  borderWidth: 1,
                }]
              }}
              chartType="bar"
              title={`${yAxis} vs ${xAxis}`}
            />
          ) : (
            <Chart3D 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                  label: yAxis,
                  data: [12, 19, 3, 5, 2],
                }]
              }}
              chartType="bar"
              title={`3D ${yAxis} vs ${xAxis}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Analysis; 