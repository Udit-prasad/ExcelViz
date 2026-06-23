import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 200, damping: 20 } 
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 250, damping: 22 } 
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-10 p-4 sm:p-6"
    >
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants} 
        className="text-center py-16 px-6 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-indigo-950/40 rounded-[24px] border border-white/5 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-heading font-bold text-xs uppercase tracking-widest rounded-full">
            Telemetry Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            ExcelViz <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Insights Hub</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl font-sans font-medium max-w-xl mx-auto leading-relaxed">
            Transform raw spreadsheet data into luminous, interactive 3D and 2D telemetry dashboards with advanced AI-driven analytical reports.
          </p>
          <div className="pt-4 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-bold px-8 py-3.5 rounded-xl tracking-wide shadow-xl shadow-cyan-500/10 transition-all block text-sm uppercase"
              >
                Launch Matrix
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -6 }}
          className="glass-panel p-8 rounded-[24px] shadow-xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500" />
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">2D/3D Telemetry</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium">
            Generate rotating 3D bar models and highly readable 2D charts to view metrics from multiple angles.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -6 }}
          className="glass-panel p-8 rounded-[24px] shadow-xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all duration-500" />
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg>
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">AI Intelligence</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium">
            Receive instant, data-backed reports and executive summaries powered by advanced LLM analytics.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -6 }}
          className="glass-panel p-8 rounded-[24px] shadow-xl relative overflow-hidden group hover:border-pink-500/20 transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500" />
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">Persistent Archive</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium">
            Track and search your entire upload history in a highly secure user vault, ready for instant export.
          </p>
        </motion.div>
      </div>

      {/* How It Works */}
      <motion.div 
        variants={itemVariants} 
        className="glass-panel p-8 sm:p-10 rounded-[24px] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2.5">
          <span className="w-2 h-6 bg-cyan-500 rounded-full" />
          How It Operates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Initialize', desc: 'Upload your spreadsheet datasets (.xls, .xlsx) up to 10 MB.' },
            { step: '2', title: 'Configure', desc: 'Select column matrices for X and Y axes telemetry.' },
            { step: '3', title: 'Visualize', desc: 'Render instant, highly accurate 2D/3D visualizations.' },
            { step: '4', title: 'Report', desc: 'Trigger AI auto-insights to capture hidden data anomalies.' }
          ].map((item) => (
            <motion.div 
              key={item.step}
              variants={stepVariants}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-xl relative group hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-heading font-black flex items-center justify-center text-sm shadow-md mb-4 group-hover:scale-105 transition-transform">
                {item.step}
              </div>
              <h4 className="font-heading font-bold text-white text-base mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-400 font-sans font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div 
        variants={itemVariants}
        className="glass-panel p-8 sm:p-10 rounded-[24px]"
      >
        <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2.5">
          <span className="w-2 h-6 bg-indigo-500 rounded-full" />
          Integrated Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'React.js', border: 'hover:border-cyan-500/20', color: 'text-cyan-400', initial: 'R' },
            { label: 'Chart.js', border: 'hover:border-teal-500/20', color: 'text-teal-400', initial: 'C' },
            { label: 'Three.js', border: 'hover:border-purple-500/20', color: 'text-purple-400', initial: '3D' },
            { label: 'Tailwind CSS', border: 'hover:border-indigo-500/20', color: 'text-indigo-400', initial: 'T' }
          ].map((tech) => (
            <motion.div 
              key={tech.label}
              whileHover={{ scale: 1.03 }}
              className={`text-center p-6 bg-slate-900/30 border border-white/5 rounded-xl transition-all duration-300 cursor-default ${tech.border}`}
            >
              <div className={`text-2xl mb-2 font-heading font-black ${tech.color}`}>
                {tech.initial}
              </div>
              <div className="font-sans font-bold text-sm text-slate-200">{tech.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        variants={itemVariants}
        className="text-center py-10 max-w-xl mx-auto space-y-6"
      >
        <h2 className="text-3xl font-heading font-black text-white tracking-tight">Ready to map your data?</h2>
        <p className="text-slate-400 text-sm font-sans font-medium leading-relaxed">
          Unlock the powerful 3D structural telemetry and AI processing matrices of ExcelViz. Setting up takes less than a minute.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-bold px-8 py-3.5 rounded-xl tracking-wider shadow-lg hover:shadow-cyan-500/20 transition-all text-xs uppercase"
            >
              Sign Up Free
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="bg-white/5 hover:bg-white/10 text-slate-300 font-heading font-bold px-8 py-3.5 rounded-xl border border-white/10 tracking-wider transition-all text-xs uppercase"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;