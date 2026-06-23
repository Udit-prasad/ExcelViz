import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg> },
    { path: '/analysis', label: 'Analysis', icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { path: '/history', label: 'History', icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { path: '/profile', label: 'Profile', icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <aside className="w-64 glass-panel rounded-[24px] flex-shrink-0 hidden md:block transition-all duration-300">
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest mb-6">Matrix Pro Menu</h2>
        <nav className="space-y-2.5 flex-1">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border-r-2 border-cyan-500 shadow-lg shadow-cyan-500/5'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
