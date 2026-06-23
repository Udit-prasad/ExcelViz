import React from 'react';
import { motion } from 'framer-motion';

const ProfileCard = ({ user, stats }) => {
  const displayStats = stats || {
    totalAnalyses: 0,
    chartsCreated: 0,
    lastActive: 'Today',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="glass-panel p-6 rounded-[24px] shadow-2xl relative overflow-hidden group"
    >
      {/* Luminous Glow Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      
      <div className="text-center mb-6 relative z-10">
        <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/20 border-2 border-white/10 group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl font-heading font-black text-white">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">{user?.name || 'Guest User'}</h3>
        <p className="text-sm font-sans font-medium text-slate-400">{user?.email || 'N/A'}</p>
        <div className="mt-4">
          <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md ${
            user?.isAdmin 
              ? 'bg-purple-950/40 text-purple-400 border border-purple-500/25 shadow-purple-500/5' 
              : 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/25 shadow-cyan-500/5'
          }`}>
            {user?.isAdmin ? 'Administrator' : 'User'}
          </span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-5 relative z-10">
        <h4 className="text-xs font-heading font-bold text-slate-500 uppercase tracking-widest mb-4">Account Statistics</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center group/stat">
            <span className="text-sm font-sans font-medium text-slate-400 group-hover/stat:text-cyan-400 transition-colors">Total Analyses</span>
            <span className="text-sm font-heading font-bold text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">{displayStats.totalAnalyses}</span>
          </div>
          <div className="flex justify-between items-center group/stat">
            <span className="text-sm font-sans font-medium text-slate-400 group-hover/stat:text-cyan-400 transition-colors">Charts Created</span>
            <span className="text-sm font-heading font-bold text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">{displayStats.chartsCreated}</span>
          </div>
          <div className="flex justify-between items-center group/stat">
            <span className="text-sm font-sans font-medium text-slate-400 group-hover/stat:text-cyan-400 transition-colors">Last Active</span>
            <span className="text-sm font-heading font-bold text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">{displayStats.lastActive}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Edit Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;