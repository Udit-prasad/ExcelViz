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
  const chartRef = useRef(null);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const { token, user } = useSelector(state => state.auth);

  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset) => {
      const ds = { ...dataset };
      if (chartType === 'line' || chartType === 'scatter') {
        ds.tension = 0.4;
        ds.fill = true;
        ds.backgroundColor = 'rgba(6, 182, 212, 0.08)';
        ds.borderColor = '#06b6d4';
        ds.pointBackgroundColor = '#06B6D4';
        ds.pointBorderColor = '#fff';
        ds.pointBorderWidth = 1.5;
        ds.pointRadius = 4;
        ds.pointHoverRadius = 7;
      } else if (chartType === 'bar') {
        ds.borderRadius = 6;
        ds.borderWidth = 1.5;
        ds.backgroundColor = [
          'rgba(6, 182, 212, 0.6)',
          'rgba(99, 102, 241, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(244, 63, 94, 0.6)'
        ];
        ds.borderColor = [
          'rgba(6, 182, 212, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(244, 63, 94, 1)'
        ];
      }
      return ds;
    })
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 11,
            weight: '700'
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: '#ffffff',
        font: {
          family: 'Outfit, Inter, sans-serif',
          size: 16,
          weight: '900',
        },
        padding: { bottom: 15 }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 10,
            weight: '600'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 10,
            weight: '600'
          }
        },
        beginAtZero: true
      }
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={enhancedData} options={chartOptions} ref={chartRef} />;
      case 'pie':
        return <Pie data={enhancedData} options={chartOptions} ref={chartRef} />;
      case 'doughnut':
        return <Doughnut data={enhancedData} options={chartOptions} ref={chartRef} />;
      case 'scatter': {
        const scatterData = {
          ...enhancedData,
          datasets: enhancedData.datasets.map(ds => ({
            ...ds,
            showLine: false,
            pointRadius: 6,
            pointHoverRadius: 8,
          }))
        };
        return <Line data={scatterData} options={chartOptions} ref={chartRef} />;
      }
      default:
        return <Bar data={enhancedData} options={chartOptions} ref={chartRef} />;
    }
  };

  const handleDownloadPNG = () => {
    const chartCanvas = chartRef.current?.canvas;
    if (chartCanvas) {
      if (!user?.isPremium) {
        const ctx = chartCanvas.getContext('2d');
        ctx.save();
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.textAlign = 'right';
        ctx.fillText('ExcelViz', chartCanvas.width - 20, chartCanvas.height - 20);
        ctx.restore();
      }
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
      if (!user?.isPremium) {
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.textAlign = 'right';
        ctx.fillText('ExcelViz', canvas.width - 40, canvas.height - 40);
        ctx.restore();
      }
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
    <div className="bg-[#111827] border border-white/5 p-6 rounded-[24px] shadow-lg relative overflow-hidden" ref={chartContainerRef}>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black font-heading text-white mb-2">
            {title}
          </h3>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] uppercase font-bold rounded-full">
              {chartType.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPNG}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={handleGetInsights}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-all"
            disabled={loadingInsights}
          >
            {loadingInsights ? 'Generating...' : 'AI Insights'}
          </button>
        </div>
      </div>
      <div className="w-full h-96 relative">
        {renderChart()}
        {!user?.isPremium && (
          <div className="absolute bottom-6 right-6 bg-slate-950/80 border border-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-heading font-black uppercase tracking-widest text-cyan-400 select-none pointer-events-none z-10 shadow-lg">
            ExcelViz
          </div>
        )}
      </div>
      {insights && (
        <div className="mt-6 p-4 bg-indigo-500/10 border-l-4 border-indigo-500 text-slate-300 rounded-xl border-y border-r border-white/5 font-sans font-medium text-xs leading-relaxed">
          <strong className="text-white block mb-1">AI Insights:</strong> {insights}
        </div>
      )}
    </div>
  );
};

export default Chart2D;
