import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchHistory } from '../features/history/historySlice';
import HistoryTable from '../components/HistoryTable';
import SubscriptionModal from '../components/SubscriptionModal';

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHistory());
    if (user && !user.isPremium) {
      setIsSubscriptionOpen(true);
    }
  }, [dispatch, user]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  const isFreeTrial = user && !user.isPremium;

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants} 
      className="space-y-8 p-4 sm:p-6 relative min-h-[70vh]"
    >
      {/* Blurred container if user is in free trial */}
      <div className={`space-y-8 transition-all duration-500 ${isFreeTrial ? 'filter blur-md pointer-events-none select-none' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight flex items-center gap-4"
            >
              <span className="p-3 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 text-cyan-400 border border-cyan-500/30 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Analysis History
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-400 mt-3 text-lg font-sans font-medium">
              View and manage your previous analyses and interactive charts.
            </motion.p>
          </div>
        </div>

        <motion.div variants={itemVariants}>
          <HistoryTable />
        </motion.div>
      </div>

      {/* Subscription Callout Card if user is in free trial */}
      {isFreeTrial && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-[2px] z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900/90 border border-white/10 p-8 rounded-3xl text-center space-y-6 shadow-2xl relative"
          >
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-md">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-black text-white">History Logs Locked</h3>
              <p className="font-body text-slate-400 text-xs leading-relaxed">
                Analysis history logs are exclusive to <strong className="text-cyan-400">ExcelViz Pro</strong> members. Upgrade to unlock secure storage, past data restoration, and advanced analytics.
              </p>
            </div>

            <button 
              onClick={() => setIsSubscriptionOpen(true)}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
            >
              Upgrade to ExcelViz Pro
            </button>
          </motion.div>
        </div>
      )}

      {/* Subscription Popup Modal */}
      <SubscriptionModal 
        isOpen={isSubscriptionOpen} 
        onClose={() => {
          // If free trial, they cannot dismiss history lock popup completely, but we let them close the modal
          setIsSubscriptionOpen(false);
        }} 
        title="Unlock ExcelViz History Logs"
      />
    </motion.div>
  );
};

export default History;