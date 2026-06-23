import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SubscriptionModal from './SubscriptionModal';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const InsightCard = ({ recentAnalysis }) => {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const fetchInsights = useCallback(async () => {
    if (!recentAnalysis?._id) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/ai/insights/${recentAnalysis._id}`,
        { headers: { 'x-auth-token': token } }
      );
      if (response.data?.success) {
        setInsights(response.data.insights);
      } else {
        setError('Unable to parse data insights.');
      }
    } catch (err) {
      console.error('Error fetching dashboard insights:', err);
      const errorMsg = err.response?.data?.msg || '';
      if (
        err.response?.status === 402 ||
        errorMsg.includes('trial') ||
        errorMsg.includes('limit') ||
        errorMsg.includes('expired') ||
        errorMsg.includes('upgrade')
      ) {
        setError('paywall');
      } else {
        setError('Failed to load telemetry insights. Please retry.');
      }
    } finally {
      setLoading(false);
    }
  }, [recentAnalysis?._id]);

  useEffect(() => {
    if (recentAnalysis?._id) {
      fetchInsights();
    }
  }, [recentAnalysis?._id, fetchInsights]);

  // A helper to parse markdown strings into gorgeous React components for a premium look
  const parseMarkdownToJSX = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-2" />;

      // Main header
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        return (
          <h4 key={index} className="text-lg font-heading font-black text-white mt-5 mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-cyan-400 rounded-full" />
            {title}
          </h4>
        );
      }

      // Secondary header
      if (trimmed.startsWith('#### ')) {
        const title = trimmed.replace('#### ', '');
        return (
          <h5 key={index} className="text-sm font-heading font-extrabold text-cyan-300 mt-4 mb-2 tracking-wide uppercase">
            {title}
          </h5>
        );
      }

      // Bullet points with bold titles (e.g. * **Title**: Desc)
      if (trimmed.startsWith('* **') || trimmed.startsWith('- **')) {
        const cleaned = trimmed.replace(/^[*-\s]+/, ''); // remove bullet indicators
        const boldMatch = cleaned.match(/^\*\*(.*?)\*\*:(.*)/);
        if (boldMatch) {
          const key = boldMatch[1];
          const val = boldMatch[2];
          return (
            <div key={index} className="flex items-start gap-2.5 py-1 text-sm font-sans font-medium text-slate-355">
              <span className="text-cyan-400 mt-1 flex-shrink-0">✦</span>
              <div>
                <strong className="text-white font-semibold">{key}:</strong>
                <span className="text-slate-300 ml-1">{val}</span>
              </div>
            </div>
          );
        }
      }

      // Standard bullets
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const content = trimmed.replace(/^[*-\s]+/, '');
        return (
          <div key={index} className="flex items-start gap-2.5 py-1 text-sm font-sans font-medium text-slate-300">
            <span className="text-indigo-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
            <span>{content}</span>
          </div>
        );
      }

      // Inline highlights for general paragraphs
      return (
        <p key={index} className="text-sm font-sans font-medium text-slate-300 leading-relaxed py-0.5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="glass-panel p-6 rounded-[24px] shadow-2xl relative overflow-hidden group border border-white/5">
      {/* Background glow matrix */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-heading font-black text-white">AI Telemetry Insights</h3>
            {recentAnalysis && (
              <p className="text-[10px] text-slate-400 font-sans font-semibold mt-0.5">
                ACTIVE DATASET: <span className="text-indigo-400">{recentAnalysis.originalName}</span>
              </p>
            )}
          </div>
        </div>
        <span className="px-3.5 py-1 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 rounded-full text-[10px] font-extrabold font-heading text-cyan-400 uppercase tracking-widest">
          SYSTEM ACTIVE
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 min-h-[180px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center space-y-4"
            >
              {/* Spinning telemetry indicator */}
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 animate-spin" />
              </div>
              <p className="text-sm text-slate-400 font-sans font-medium animate-pulse">Running advanced diagnostic AI analytics...</p>
            </motion.div>
          ) : error === 'paywall' ? (
            <motion.div
              key="paywall"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center space-y-4 bg-indigo-950/20 border border-indigo-500/20 p-5 rounded-2xl shadow-xl"
            >
              <div className="w-12 h-12 bg-indigo-950/50 border border-indigo-500/30 text-indigo-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading font-black text-white text-base">Telemetry Insights Locked</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your free trial has exceeded the 1-visualization limit. Upgrade to ExcelViz Pro to unlock unlimited visual compilations and full AI telemetry reports.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPaywallOpen(true)}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-cyan-500/10 transition-all uppercase tracking-wider"
              >
                Upgrade to Pro
              </motion.button>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center space-y-3"
            >
              <p className="text-sm text-rose-400 font-sans font-semibold">{error}</p>
              <button
                onClick={fetchInsights}
                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                Retry Scan
              </button>
            </motion.div>
          ) : !recentAnalysis ? (
            <motion.div
              key="no-analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-heading font-bold text-sm">No Active Datasets Found</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Upload an Excel workbook file in the Workspace to run high-fidelity visual compilations and unlock AI-driven insights.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="insights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {parseMarkdownToJSX(insights)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recalculate Button */}
      {recentAnalysis && !loading && error !== 'paywall' && (
        <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={fetchInsights}
            className="w-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 py-3 px-4 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 group shadow-lg shadow-indigo-500/5"
          >
            <svg className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Telemetry Diagnostics
          </motion.button>
        </div>
      )}

      {/* Subscription Paywall Modal */}
      <SubscriptionModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Upgrade to ExcelViz Pro"
      />
    </div>
  );
};

export default InsightCard;