import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import Chart2D from '../components/Chart2D';
import Chart3D from '../components/Chart3D';
import { clearAnalysis, generateChart, setXAxis, setYAxis, setChartType } from '../features/analysis/analysisSlice';
import axios from 'axios';
import SubscriptionModal from '../components/SubscriptionModal';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Analysis = () => {
  const dispatch = useDispatch();
  const { uploadedFile, columns, analysisData, chartData, xAxis, yAxis, chartType, loading } = useSelector((state) => state.analysis);
  const [showChart, setShowChart] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [summaryReport, setSummaryReport] = useState('');
  const [loadingReport, setLoadingReport] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [subscriptionTitle, setSubscriptionTitle] = useState('Upgrade to ExcelViz Pro');

  useEffect(() => {
    return () => {
      dispatch(clearAnalysis());
    };
  }, [dispatch]);

  const handleGenerateChart = async () => {
    if (xAxis && yAxis && analysisData?.analysisId) {
      const action = await dispatch(generateChart({
        analysisId: analysisData.analysisId,
        chartType,
        xAxis,
        yAxis,
      }));

      if (generateChart.fulfilled.match(action)) {
        setShowChart(true);
      } else {
        const errorMsg = action.payload || '';
        if (errorMsg.includes('trial') || errorMsg.includes('limit') || errorMsg.includes('expired') || errorMsg.includes('upgrade')) {
          setSubscriptionTitle("Upgrade to ExcelViz Pro");
          setIsSubscriptionOpen(true);
        }
      }
    }
  };

  const generateAIInsights = async () => {
    if (!analysisData || !xAxis || !yAxis) return;
    setLoadingInsights(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/ai/insights`,
        { data: analysisData.data, chartType, xAxis, yAxis },
        { headers: { 'x-auth-token': token } }
      );
      setAiInsights(response.data.insights);
    } catch (error) {
      console.error('Error generating AI insights:', error);
      const errorMsg = error.response?.data?.msg || '';
      if (errorMsg.includes('trial') || errorMsg.includes('limit') || errorMsg.includes('expired') || errorMsg.includes('upgrade')) {
        setSubscriptionTitle("Upgrade to ExcelViz Pro");
        setIsSubscriptionOpen(true);
      } else {
        setAiInsights('Failed to generate insights. Please try again.');
      }
    } finally {
      setLoadingInsights(false);
    }
  };

  const generateSummaryReport = async () => {
    if (!analysisData) return;
    setLoadingReport(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/ai/summary`,
        { data: analysisData.data, fileName: analysisData.originalName || 'Excel Data' },
        { headers: { 'x-auth-token': token } }
      );
      setSummaryReport(response.data.report);
    } catch (error) {
      console.error('Error generating summary report:', error);
      const errorMsg = error.response?.data?.msg || '';
      if (errorMsg.includes('trial') || errorMsg.includes('limit') || errorMsg.includes('expired') || errorMsg.includes('upgrade')) {
        setSubscriptionTitle("Upgrade to ExcelViz Pro");
        setIsSubscriptionOpen(true);
      } else {
        setSummaryReport('Failed to generate report. Please try again.');
      }
    } finally {
      setLoadingReport(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-xl shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2m0 2c1.105 0 2-.895 2-2m0 0V5a2 2 0 012-2h9a2 2 0 012 2v14a2 2 0 01-2 2h-9a2 2 0 01-2-2z" /></svg>
            </span>
            Data Interface
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-400 mt-3 text-lg font-sans font-medium">
            Upload Excel files to create stunning <span className="font-bold text-cyan-400">interactive visualizations</span>
          </motion.p>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {/* File Upload Section */}
        {!uploadedFile && (
          <motion.div 
            key="upload" 
            variants={itemVariants} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} 
            className="glass-panel p-8 rounded-[24px] shadow-2xl relative overflow-hidden group hover:border-cyan-500/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-sm shadow-md">1</span>
              Initialize Dataset
            </h2>
            <div className="relative z-10">
              <FileUpload />
            </div>
          </motion.div>
        )}


        {/* Chart Configuration Section */}
        {uploadedFile && (
          <motion.div 
            key="config" 
            variants={itemVariants} 
            className="glass-panel p-6 sm:p-8 rounded-[24px] shadow-2xl relative overflow-hidden group hover:border-indigo-500/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-sm shadow-md">2</span>
                Configure Visualization
              </h2>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold font-heading text-slate-400 uppercase tracking-widest shadow-sm">{analysisData?.originalName || 'Active File'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10">
              <div className="space-y-2.5">
                <label className="block text-xs font-heading font-bold text-slate-500 uppercase tracking-widest">Chart Format</label>
                <div className="relative">
                  <select
                    value={chartType} onChange={(e) => dispatch(setChartType(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 bg-slate-900/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 appearance-none transition-all font-sans font-medium select-none [&>option]:bg-[#0B0F19] [&>option]:text-white"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="scatter">Scatter Plot</option>
                    <option value="pie">Pie Chart</option>
                    <option value="3d">3D Chart</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-heading font-bold text-slate-500 uppercase tracking-widest">X-Axis Data</label>
                <div className="relative">
                  <select
                    value={xAxis} onChange={(e) => dispatch(setXAxis(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 bg-slate-900/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 appearance-none transition-all font-sans font-medium select-none [&>option]:bg-[#0B0F19] [&>option]:text-white"
                  >
                    <option value="">Select Column</option>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-heading font-bold text-slate-500 uppercase tracking-widest">Y-Axis Data</label>
                <div className="relative">
                  <select
                    value={yAxis} onChange={(e) => dispatch(setYAxis(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 bg-slate-900/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 appearance-none transition-all font-sans font-medium select-none [&>option]:bg-[#0B0F19] [&>option]:text-white"
                  >
                    <option value="">Select Column</option>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10 pt-6 border-t border-white/5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateChart} disabled={!xAxis || !yAxis || loading}
                className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-heading font-bold transition-all shadow-lg shadow-cyan-500/10 uppercase tracking-widest text-xs flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                Render View
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateAIInsights} disabled={!xAxis || !yAxis || loadingInsights}
                className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-heading font-bold transition-all shadow-lg shadow-indigo-500/10 uppercase tracking-widest text-xs flex items-center justify-center gap-2.5"
              >
                {loadingInsights ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Analyzing...</>
                ) : (
                  <><svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg> Auto Insights</>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateSummaryReport} disabled={loadingReport}
                className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white px-8 py-3.5 rounded-xl font-heading font-bold transition-all shadow-md uppercase tracking-widest text-xs flex items-center justify-center gap-2.5"
              >
                {loadingReport ? (
                   <><svg className="w-4 h-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Processing</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> View Summary</>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Section */}
        <AnimatePresence>
          {aiInsights && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="glass-panel p-6 rounded-[24px] shadow-2xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300"
            >
              <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 rounded-lg"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg></span>
                Intelligence Report
              </h2>
              <div className="prose max-w-none">
                <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5 leading-relaxed text-sm whitespace-pre-wrap font-sans font-medium text-slate-300 shadow-inner relative z-10">
                  {aiInsights}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Report Section */}
        <AnimatePresence>
          {summaryReport && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="glass-panel p-6 rounded-[24px] shadow-2xl relative overflow-hidden group hover:border-teal-500/20 transition-all duration-300"
            >
              <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-teal-950/40 border border-teal-500/30 text-teal-400 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></span>
                Executive Summary
              </h2>
              <div className="prose max-w-none">
                <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5 leading-relaxed text-sm whitespace-pre-wrap font-sans font-medium text-slate-300 shadow-inner relative z-10">
                  {summaryReport}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart Display Section */}
      <AnimatePresence mode="popLayout">
        {showChart && xAxis && yAxis && chartData && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ type: "spring", stiffness: 200, damping: 20 }} 
            className="glass-panel p-4 sm:p-6 rounded-[24px] shadow-2xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
            <div className="bg-slate-900/60 rounded-xl p-4 sm:p-6 shadow-inner relative z-10 border border-white/5">
              {chartType !== '3d' ? (
                <Chart2D data={chartData} chartType={chartType} title={`${typeof yAxis === 'string'? yAxis.toUpperCase() : yAxis} VS ${typeof xAxis === 'string'? xAxis.toUpperCase() : xAxis}`} />
              ) : (
                <Chart3D data={chartData} chartType={chartType} title={`3D ${yAxis} vs ${xAxis}`} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} title={subscriptionTitle} />
    </motion.div>
  );
};

export default Analysis;
