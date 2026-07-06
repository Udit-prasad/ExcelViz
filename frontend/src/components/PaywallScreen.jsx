import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PaywallScreen = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = () => {
    window.location.href = '/checkout?plan=pro&interval=yearly';
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden select-none text-white">
      {/* Dynamic Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 text-center space-y-8"
      >
        
        {/* Trial Expired Alert Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-heading font-black uppercase tracking-wider">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          Free Trial Expired
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Unlock Unlimited Business Intelligence
          </h2>
          <p className="font-body text-slate-450 italic text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            "Your 14-day free trial has expired. Upgrade to ExcelViz Pro to continue uploading workbooks, rendering rotating 3D WebGL charts, and synthesizing OpenAI GPT-4 insights."
          </p>
        </div>

        {/* Premium Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left border-y border-slate-800/60 py-6 my-2">
          <div className="flex items-start gap-3">
            <span className="p-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm">✓</span>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">Unlimited Excel Uploads</h4>
              <p className="font-body text-slate-400 text-xs mt-0.5">Parse massive .xls & .xlsx workbooks with zero volume caps.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm">✓</span>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">Three.js WebGL 3D Orbit</h4>
              <p className="font-body text-slate-400 text-xs mt-0.5">Walk through complex multi-axis datasets in spatial 3D coordinates.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm">✓</span>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">GPT-4 Auto Insights</h4>
              <p className="font-body text-slate-400 text-xs mt-0.5">Instantly compile trend briefs, flag outliers, and outline recommendations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-sm">✓</span>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">Boardroom-Ready Exports</h4>
              <p className="font-body text-slate-400 text-xs mt-0.5">Download full high-resolution PNG snapshots or formatted PDF briefs.</p>
            </div>
          </div>
        </div>

        {/* Pricing Info & Action CTA */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-heading font-black text-white">$5</span>
              <span className="text-sm font-heading font-bold text-slate-500 uppercase tracking-widest">/ Month</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">Billed Annually ($60/yr)</span>
            <span className="text-xs text-slate-500 font-medium">Or $10 / month billed monthly</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 disabled:opacity-75 text-white font-heading font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Connecting to payment...
              </>
            ) : (
              'Unlock Premium Pro Access'
            )}
          </motion.button>
          
          <p className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest">
            🛡️ Secure Checkout via Stripe • Cancel Anytime
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default PaywallScreen;
