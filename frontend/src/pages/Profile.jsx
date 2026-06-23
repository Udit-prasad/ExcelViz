import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { updateProfile } from '../features/auth/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(action)) {
      setIsEditing(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-xl shadow-inner group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            Profile Settings
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-400 mt-3 text-lg font-sans font-medium">
            Manage your personal data and application preferences
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="glass-panel p-8 rounded-[24px] shadow-2xl relative overflow-hidden group hover:border-cyan-500/10 transition-all duration-300">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none" />
            <div className="text-center relative z-10">
              <div className="w-28 h-28 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20 border-2 border-white/10 group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl font-heading font-black text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">{user?.name}</h3>
              <p className="text-sm font-sans font-medium text-slate-400 mb-4">{user?.email}</p>
              <div>
                <span className={`inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-md ${
                  user?.isAdmin 
                    ? 'bg-purple-950/40 text-purple-400 border border-purple-500/25 shadow-purple-500/5' 
                    : 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/25 shadow-cyan-500/5'
                }`}>
                  {user?.isAdmin ? 'Administrator' : 'Standard User'}
                </span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10 space-y-3">
              <div className="flex items-center justify-between text-sm group/stat">
                <span className="font-heading font-bold text-slate-500 uppercase tracking-wider">Status</span>
                <span className="font-heading font-bold border border-emerald-500/20 bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm group/stat">
                <span className="font-heading font-bold text-slate-500 uppercase tracking-wider">Joined</span>
                <span className="font-heading font-bold text-white">Oct 2023</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-[24px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                Account Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-heading font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-heading font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing}
                  required
                  className="w-full px-4 py-3 bg-slate-900/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing}
                  required
                  className="w-full px-4 py-3 bg-slate-900/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {isEditing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 pt-4 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white px-6 py-3 rounded-xl font-heading font-bold transition-all shadow-lg shadow-cyan-500/10 uppercase tracking-widest text-xs"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button" onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 px-6 py-3 rounded-xl font-heading font-bold transition-all shadow-md uppercase tracking-widest text-xs"
                  >
                    Discard
                  </motion.button>
                </motion.div>
              )}
            </form>
          </div>

          {/* Account Stats Modules */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-[24px] shadow-2xl flex items-center gap-4 group hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-cyan-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <div className="text-3xl font-heading font-black text-white">0</div>
                <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 mt-1">Total Analyses</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-[24px] shadow-2xl flex items-center gap-4 group hover:border-indigo-500/20 transition-all duration-300"
            >
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/25 text-indigo-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
              </div>
              <div>
                <div className="text-3xl font-heading font-black text-white">0</div>
                <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 mt-1">Charts Saved</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile; 
