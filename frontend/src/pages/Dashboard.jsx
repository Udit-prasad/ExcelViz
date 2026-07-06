import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHistory } from '../features/history/historySlice';
import { loadExistingAnalysis } from '../features/analysis/analysisSlice';
import { getProfile } from '../features/auth/authSlice';
import ProfileCard from '../components/ProfileCard';
import InsightCard from '../components/InsightCard';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { history } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchHistory());

    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get('payment');
    if (paymentStatus === 'success' || paymentStatus === 'simulated') {
      setShowPaymentSuccess(true);
      dispatch(getProfile());
      
      // Clean query parameters from URL securely without loops
      navigate('/dashboard', { replace: true });
    }
  }, [dispatch, navigate]);

  const stats = {
    totalAnalyses: history.length,
    recentAnalyses: history.slice(0, 5).length,
    chartTypes: [...new Set(history.map(item => item.chartType).filter(Boolean))].length,
  };

  const activeStats = {
    totalAnalyses: history.length,
    chartsCreated: history.filter(item => item.chartType).length,
    lastActive: history.length > 0 ? new Date(history[0].createdAt).toLocaleDateString() : 'Today'
  };

  const handleLoadAnalysis = (item) => {
    dispatch(loadExistingAnalysis(item));
    navigate('/analysis');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 350, damping: 26 } 
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto"
    >
      {/* Premium Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div>
          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <span className="h-7 w-2 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Control Center
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-slate-400 mt-2 text-sm sm:text-base font-sans font-medium">
            Welcome back, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{user?.name}</span>! Inspect telemetry metrics and AI recommendations.
          </motion.p>
        </div>
        
        {/* System load metric details */}
        <motion.div 
          variants={itemVariants} 
          className="bg-slate-900/40 backdrop-blur-md px-4.5 py-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-4"
        >
          <div>
            <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest mb-0.5">Telemetry Status</p>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Workspace Synced
            </p>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div>
            <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest mb-0.5">Account Status</p>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {user?.isPremium ? 'Premium Pro Member' : user?.isAdmin ? 'Pro Administrator' : 'Standard Trial'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Analyses */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.25)' }}
          className="glass-panel p-6 rounded-[22px] shadow-2xl relative overflow-hidden group border border-white/5 transition-all duration-300 cursor-default"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500" />
          <div className="flex items-center relative z-10">
            <div className="p-3.5 bg-gradient-to-tr from-cyan-500/10 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest mb-0.5">Parsed Datasets</p>
              <p className="text-3xl font-heading font-black text-white">{stats.totalAnalyses}</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Charts Created */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.25)' }}
          className="glass-panel p-6 rounded-[22px] shadow-2xl relative overflow-hidden group border border-white/5 transition-all duration-300 cursor-default"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all duration-500" />
          <div className="flex items-center relative z-10">
            <div className="p-3.5 bg-gradient-to-tr from-indigo-500/10 to-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-xl shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Visuals</p>
              <p className="text-3xl font-heading font-black text-white">{activeStats.chartsCreated}</p>
            </div>
          </div>
        </motion.div>

        {/* Unique Chart Configurations */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.25)' }}
          className="glass-panel p-6 rounded-[22px] shadow-2xl relative overflow-hidden group border border-white/5 transition-all duration-300 cursor-default"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-500" />
          <div className="flex items-center relative z-10">
            <div className="p-3.5 bg-gradient-to-tr from-amber-500/10 to-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest mb-0.5">Unique Formats</p>
              <p className="text-3xl font-heading font-black text-white">{stats.chartTypes}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Dashboard Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ProfileCard user={user} stats={activeStats} />
        </motion.div>

        {/* AI Diagnostics & Upload Logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dynamic AI Telemetry Insights */}
          <motion.div variants={itemVariants}>
            <InsightCard recentAnalysis={history[0]} />
          </motion.div>
          
          {/* Recent Upload Logs list */}
          <motion.div 
            variants={itemVariants} 
            className="glass-panel p-6 rounded-[24px] shadow-2xl relative overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-cyan-500 rounded-full" />
                Recent Datasets
              </h3>
              <button 
                onClick={() => navigate('/history')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
              >
                Full Archive &rarr;
              </button>
            </div>

            {history.length > 0 ? (
              <div className="space-y-3 relative z-10">
                {history.slice(0, 5).map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, borderColor: 'rgba(6, 182, 212, 0.2)' }}
                    key={item._id} 
                    onClick={() => handleLoadAnalysis(item)}
                    className="flex items-center p-4 bg-slate-900/30 hover:bg-slate-900/50 rounded-xl border border-white/5 transition-all duration-300 shadow-md group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-950/40 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-heading font-extrabold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {item.originalName}
                      </p>
                      <p className="text-xs font-sans font-medium text-slate-400 mt-0.5">
                        {new Date(item.createdAt).toLocaleDateString()} • <span className="uppercase font-bold text-indigo-400">{item.chartType || 'UNMAPPED'}</span>
                      </p>
                    </div>
                    <div className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-white/10 bg-slate-900/20 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <p className="text-slate-400 font-heading font-medium">No activity history detected</p>
                <p className="text-xs text-slate-500 mt-1 mb-5">Upload your first spreadsheet to initialize the database.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/analysis')}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all uppercase tracking-wider"
                >
                  Start New Upload
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {showPaymentSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentSuccess(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0F172A] border border-emerald-500/30 rounded-[32px] p-8 shadow-2xl relative z-10 text-center overflow-hidden"
            >
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-lg shadow-emerald-500/15">
                <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-heading font-black tracking-tight text-white mb-3">
                Upgrade Confirmed!
              </h3>
              <p className="font-body text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Congratulations! Your account has been upgraded to <strong className="text-cyan-400">ExcelViz Pro Plan</strong>. All premium telemetry grids, spatial 3D WebGL charts, and unlimited AI analytics are now unlocked.
              </p>

              <button
                onClick={() => setShowPaymentSuccess(false)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-3.5 rounded-xl font-heading font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/15 transition-all"
              >
                Launch Workspace
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;