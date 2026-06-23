import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteAnalysis } from '../features/history/historySlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const HistoryTable = () => {
  const { history, loading } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  // State for custom UX overlays
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const triggerToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 4000);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteAnalysis(deleteTargetId));
      triggerToast('Analysis record permanently removed.', 'success');
      setDeleteTargetId(null);
    }
  };

  const handleDownload = async (item) => {
    try {
      const response = await fetch(`${API_URL}/analysis/${item._id}/download`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const fileUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = item.originalName || item.fileName || 'analysis.xlsx';
      link.click();
      URL.revokeObjectURL(fileUrl);
      triggerToast(`Exporting "${item.originalName}" to Excel package format...`, 'success');
    } catch (error) {
      triggerToast('Failed to download analysis workbook.', 'info');
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-16 rounded-[24px] flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="w-8 h-8 border-4 border-indigo-500/10 border-t-indigo-400 rounded-full animate-spin absolute"></div>
        </div>
        <div className="text-center relative z-10">
          <p className="text-white font-heading font-black uppercase tracking-widest text-xs animate-pulse">Syncing Telemetry Database</p>
          <p className="text-slate-400 text-xs font-sans mt-1.5 font-medium">Fetching archived records...</p>
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="glass-panel p-16 rounded-[24px] text-center border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="w-20 h-20 bg-slate-900/60 border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-950/20 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-2xl font-heading font-black text-white mb-2 relative z-10">No Archival Records</h3>
        <p className="text-slate-400 font-sans font-medium max-w-sm mx-auto mb-6 relative z-10 leading-relaxed text-sm">
          You haven't generated any visualizations yet. Upload your spreadsheet workbook to deploy rich telemetry analysis.
        </p>
        <motion.a 
          href="/analysis"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white px-6 py-3 rounded-xl text-sm font-heading font-bold shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 border border-cyan-400/20"
        >
          Initialize First Analysis &rarr;
        </motion.a>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-[24px] shadow-2xl overflow-hidden border border-white/5 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="px-6 sm:px-8 py-6 border-b border-white/5 bg-slate-900/40 backdrop-blur-md relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-heading font-black text-white flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full" />
            Archived Records
          </h3>
          <p className="text-xs font-sans font-medium text-slate-400 mt-1">
            Browse and manage previous Excel workbook configurations and visualization snapshots.
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 relative z-10">
          <thead className="bg-slate-950/60 border-b border-white/5">
            <tr>
              <th className="px-6 sm:px-8 py-4 text-left text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
              <th className="px-6 sm:px-8 py-4 text-left text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">Filename</th>
              <th className="px-6 sm:px-8 py-4 text-left text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 sm:px-8 py-4 text-left text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">Configuration</th>
              <th className="px-6 sm:px-8 py-4 text-left text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/10">
            {history.map((item, index) => (
              <tr key={item._id} className="hover:bg-white/5 transition-all duration-300 group">
                <td className="px-6 sm:px-8 py-5 whitespace-nowrap">
                  <div className="text-sm font-heading font-bold text-white">{new Date(item.createdAt).toLocaleDateString()}</div>
                  <div className="text-xs font-sans font-medium text-slate-400 mt-0.5">{new Date(item.createdAt).toLocaleTimeString()}</div>
                </td>
                <td className="px-6 sm:px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all duration-300 shadow-md">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-heading font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {item.originalName}
                    </span>
                  </div>
                </td>
                <td className="px-6 sm:px-8 py-5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-heading font-black uppercase tracking-widest rounded-md border ${
                    item.chartType === '3d' 
                      ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_12px_rgba(240,46,170,0.1)]' 
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                  }`}>
                    {item.chartType || 'N/A'}
                  </span>
                </td>
                <td className="px-6 sm:px-8 py-5 whitespace-nowrap text-sm">
                  {item.xAxis && item.yAxis ? (
                    <div className="flex flex-col gap-1.5 text-[10px] font-heading font-black tracking-wider">
                      <span className="bg-slate-900/60 text-slate-300 py-1 px-2.5 rounded-md w-fit border border-white/5">
                        <span className="text-cyan-400 mr-1.5 font-bold">X:</span> {item.xAxis}
                      </span>
                      <span className="bg-slate-900/60 text-slate-300 py-1 px-2.5 rounded-md w-fit border border-white/5">
                        <span className="text-indigo-400 mr-1.5 font-bold">Y:</span> {item.yAxis}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-500 font-sans font-medium italic text-xs">Not configured</span>
                  )}
                </td>
                <td className="px-6 sm:px-8 py-5 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2.5">
                    <motion.button 
                      onClick={() => handleDownload(item)} 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="p-2.5 bg-slate-900/40 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 text-slate-400 rounded-xl transition-all duration-300 shadow-md" 
                      title="Download Chart"
                    >
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.button>
                    <motion.button 
                      onClick={() => setDeleteTargetId(item._id)} 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="p-2.5 bg-slate-900/40 hover:bg-rose-500/20 hover:text-rose-400 border border-white/5 hover:border-rose-500/30 text-slate-400 rounded-xl transition-all duration-300 shadow-md" 
                      title="Delete Record"
                    >
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Glassmorphic Overlay */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTargetId(null)}
              className="absolute inset-0 bg-[#070913]/80 backdrop-blur-md"
            />
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-md p-6 rounded-[24px] border border-white/10 shadow-2xl relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-heading font-black text-white mb-2">Delete Analysis Record?</h4>
              <p className="text-slate-400 font-sans font-medium text-sm leading-relaxed mb-6">
                This action is irreversible. The parsed spreadsheet visualization and insights associated with this report will be deleted forever.
              </p>
              <div className="flex gap-4">
                <motion.button 
                  onClick={() => setDeleteTargetId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-slate-900/60 hover:bg-slate-900 border border-white/5 text-slate-300 font-heading font-bold rounded-xl transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  onClick={confirmDelete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-heading font-bold rounded-xl shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20 border border-rose-400/20 transition-all"
                >
                  Delete Record
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Status Glass-Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-5 py-3.5 glass-panel rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 w-[90%] max-w-sm sm:w-auto"
          >
            {toast.type === 'success' ? (
              <span className="p-1 bg-cyan-500/20 text-cyan-400 rounded-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="p-1 bg-indigo-500/20 text-indigo-400 rounded-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
            <p className="text-xs font-sans font-bold text-white tracking-wide">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryTable;
