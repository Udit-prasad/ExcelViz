import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { getProfile } from '../features/auth/authSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SubscriptionModal = ({ isOpen, onClose, title = "Upgrade to ExcelViz Pro" }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' or 'yearly'

  if (!isOpen) return null;

  const handleUpgrade = () => {
    window.location.href = `/checkout?plan=pro&interval=${billingCycle}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-[32px] p-8 shadow-2xl relative z-10 text-center overflow-hidden"
        >
          {/* Decorative neon backlighting */}
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 rounded-full text-[10px] font-heading font-black uppercase tracking-widest mx-auto mb-6">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Premium Feature
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white mb-3">
            {title}
          </h3>
          
          <p className="font-body text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
            You have hit the free trial limit. Upgrade to <strong className="text-cyan-400">ExcelViz Pro</strong> to unlock unlimited sheet uploads, advanced 3D visualizers, GPT-4 AI synthesis, and direct exports.
          </p>

          {/* Pricing Selector */}
          <div className="bg-slate-950/50 p-1.5 rounded-xl border border-white/5 flex gap-2 mb-6 max-w-xs mx-auto">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly (Save 50%)
            </button>
          </div>

          {/* Big Price Display */}
          <div className="mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-heading font-black text-white">
                {billingCycle === 'monthly' ? '$10' : '$5'}
              </span>
              <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">/ Month</span>
            </div>
            {billingCycle === 'yearly' && (
              <span className="text-[10px] text-cyan-400 font-extrabold block mt-2 uppercase tracking-wide">
                Billed Annually ($60/yr)
              </span>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white py-4 rounded-xl font-heading font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Connecting...
              </span>
            ) : (
              'Unlock Pro Plan Access'
            )}
          </motion.button>

          <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-widest">
            🛡️ Secure Stripe Checkout • Cancel Anytime
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;
