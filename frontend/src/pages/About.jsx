import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Excel Vista Insights Hub</h1>
        <p className="text-xl mb-6">Transform your Excel data into powerful visualizations</p>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 font-bold text-blue-600">V</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Visualization</h3>
          <p className="text-gray-600">
            Create stunning 2D and 3D charts from your Excel data with just a few clicks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 font-bold text-green-600">A</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
          <p className="text-gray-600">
            Get intelligent insights and recommendations from your data using advanced AI.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 font-bold text-purple-600">H</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">History & Management</h3>
          <p className="text-gray-600">
            Keep track of all your analyses and download charts for presentations.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Upload</h4>
            <p className="text-sm text-gray-600">Upload your Excel file (.xls or .xlsx)</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Configure</h4>
            <p className="text-sm text-gray-600">Select chart type and axes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Visualize</h4>
            <p className="text-sm text-gray-600">Generate interactive charts</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
            <p className="text-sm text-gray-600">Save and share your charts</p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2 font-bold text-blue-600">R</div>
            <div className="font-medium">React.js</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2 font-bold text-green-600">C</div>
            <div className="font-medium">Chart.js</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2 font-bold text-purple-600">T</div>
            <div className="font-medium">Three.js</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2 font-bold text-orange-600">T</div>
            <div className="font-medium">Tailwind CSS</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who are already visualizing their data with Excel Vista.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign Up Free
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 