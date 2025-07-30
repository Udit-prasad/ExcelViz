import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart2D = ({ data, chartType = 'bar', title = 'Data Visualization' }) => {
  const chartContainerRef = useRef(null);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const token = useSelector(state => state.auth.token);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  const handleDownloadPNG = async () => {
    const chartCanvas = chartContainerRef.current.querySelector('canvas');
    if (chartCanvas) {
      const url = chartCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.png`;
      link.click();
    }
  };

  const handleDownloadPDF = async () => {
    const chartDiv = chartContainerRef.current;
    if (chartDiv) {
      const canvas = await html2canvas(chartDiv, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save(`${title}.pdf`);
    }
  };

  const handleGetInsights = async () => {
    setLoadingInsights(true);
    setInsights(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/analysis/ai-insights`,
        { chartData: { ...data, type: chartType } },
        { headers: { 'x-auth-token': token } }
      );
      setInsights(response.data.insights);
    } catch (err) {
      setInsights('Failed to fetch insights.');
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" ref={chartContainerRef}>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {chartType.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPNG}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
          >
            Download PDF
          </button>
          <button
            onClick={handleGetInsights}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs"
            disabled={loadingInsights}
          >
            {loadingInsights ? 'Generating Insights...' : 'AI Insights'}
          </button>
        </div>
      </div>
      <div className="w-full h-96">
        {renderChart()}
      </div>
      {insights && (
        <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-400 text-purple-800 rounded">
          <strong>AI Insights:</strong> {insights}
        </div>
      )}
    </div>
  );
};

export default Chart2D; 