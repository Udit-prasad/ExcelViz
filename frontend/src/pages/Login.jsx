import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../features/auth/authSlice';
import { motion } from 'framer-motion';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-slate-800 font-body">
      
      {/* LEFT SIDE: Clean white login form (5 columns on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 bg-white">
        
        {/* Header Logo */}
        <Link to="/" className="flex items-center gap-3 group self-start">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-heading font-black text-base">E</span>
          </div>
          <span className="text-lg font-heading font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            ExcelViz
          </span>
        </Link>

        {/* Core Form Card */}
        <div className="w-full max-w-md mx-auto py-12 lg:py-0">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 font-semibold">
              Log in to your ExcelViz account to reload your analysis logs
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <p className="text-sm text-red-600 font-bold">{error}</p>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-heading font-black text-slate-400 uppercase tracking-widest mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all text-sm font-semibold"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-heading font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/reset-password"
                  className="text-xs font-heading font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all text-sm font-semibold"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-heading font-extrabold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg shadow-blue-500/10 transition-all"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
              <span className="relative z-10 px-3 bg-white text-[10px] font-heading font-black text-slate-400 uppercase tracking-widest">
                or continue with
              </span>
            </div>

            {/* Google sign-in */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => alert('Google authentication is integrated via SSO. Directing credentials flow...')}
              className="w-full py-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-sm"
            >
              {/* Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.74 14.93 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.8 2.95C6.21 7.23 8.87 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.61-.21-2.38H12v4.51h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.87 3.38-8.52z" />
                <path fill="#FBBC05" d="M5.3 10.45A7.16 7.16 0 015 12c0 .54.08 1.07.24 1.57l-3.8 2.95A11.96 11.96 0 011 12c0-1.65.34-3.23.94-4.66L5.3 10.45z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.8 1.09-3.13 0-5.79-2.19-6.74-5.41L.96 15.88C2.85 19.73 6.81 23 12 23z" />
              </svg>
              Google
            </motion.button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 font-body">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Sign up free →
          </Link>
        </p>

      </div>

      {/* RIGHT SIDE: Glowing Dark Navy layout (7 columns on desktop) */}
      <div className="hidden lg:flex lg:col-span-7 bg-[#0F1623] text-white flex-col justify-between p-16 xl:p-24 relative overflow-hidden select-none">
        
        {/* Glow backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="self-end text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest relative z-10">
          ExcelViz insights Hub v2.1
        </div>

        {/* Premium Visualization Layout */}
        <div className="relative w-full max-w-lg mx-auto py-8 flex flex-col items-center justify-center my-auto">
          
          {/* Subtle grid background simulating spreadsheet cells */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 border border-slate-800/30 rounded-3xl overflow-hidden pointer-events-none opacity-40">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-800/20" />
            ))}
          </div>

          {/* Glowing orbital backlights */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Primary Glassmorphic Dashboard Window */}
          <div className="relative w-full bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6 overflow-hidden z-10">
            
            {/* Header / Mock Window Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-red-500/60 rounded-full" />
                <div className="w-2.5 h-2.5 bg-yellow-500/60 rounded-full" />
                <div className="w-2.5 h-2.5 bg-green-500/60 rounded-full" />
              </div>
              <div className="text-[10px] font-heading font-black tracking-widest text-slate-500 uppercase">
                Active Visualization Engine
              </div>
            </div>

            {/* Sparkline & Key Metric */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-heading font-black text-slate-450 uppercase tracking-widest mb-1.5">
                  Quarterly Data Growth
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-black text-white tracking-tight">+48.2%</span>
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                    <svg className="w-3 h-3 fill-current mr-0.5" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    12.4%
                  </span>
                </div>
              </div>
              
              <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[10px] font-heading font-black text-cyan-400 tracking-wider">
                AUTO-SYNCED
              </div>
            </div>

            {/* Rich SVG Area Chart with Glowing Gradients */}
            <div className="h-40 w-full relative flex items-end">
              <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  {/* Neon Cyan to Indigo Linear Gradient for Stroke */}
                  <linearGradient id="stroke-grad-login" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>

                  {/* Gradient Area Fill (Fading to Transparent) */}
                  <linearGradient id="area-grad-login" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="40" x2="400" y2="40" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="4 4" />

                {/* Glowing Area Fill */}
                <path
                  d="M0,150 Q40,110 80,120 T160,70 T240,100 T320,40 T400,20 L400,160 L0,160 Z"
                  fill="url(#area-grad-login)"
                />

                {/* Glowing Stroke Path */}
                <path
                  d="M0,150 Q40,110 80,120 T160,70 T240,100 T320,40 T400,20"
                  fill="none"
                  stroke="url(#stroke-grad-login)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Glowing peak dot */}
                <circle cx="400" cy="20" r="5" fill="#6366F1" />
                <circle cx="400" cy="20" r="12" fill="#6366F1" fillOpacity="0.2" className="animate-ping" />
              </svg>
            </div>

            {/* Dynamic Card Grid (Overlay style elements inside) */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 1: Parsed Status */}
              <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-3">
                <div className="w-8.5 h-8.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Excel Parsed
                  </p>
                  <p className="text-xs font-heading font-black text-white">12,450 rows</p>
                </div>
              </div>

              {/* Card 2: AI Summarization Indicator */}
              <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {/* Spinning Ring */}
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="16" cy="16" r="13" stroke="#1E293B" strokeWidth="2.5" fill="transparent" />
                    <circle 
                      cx="16" 
                      cy="16" 
                      r="13" 
                      stroke="#06B6D4" 
                      strokeWidth="2.5" 
                      fill="transparent" 
                      strokeDasharray="81.68"
                      strokeDashoffset="12.2" // 85% full
                    />
                  </svg>
                  <span className="text-[9px] font-heading font-black text-cyan-400">94%</span>
                </div>
                <div>
                  <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Insight Precision
                  </p>
                  <p className="text-xs font-heading font-black text-white">High Score</p>
                </div>
              </div>

            </div>

          </div>

          {/* Floating dynamic insight indicator widget */}
          <div className="absolute -bottom-4 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 z-20 max-w-[210px] pointer-events-auto shadow-cyan-500/5">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] font-heading font-black text-slate-500 uppercase tracking-wider mb-0.5">
                Generation Time
              </p>
              <p className="text-xs font-heading font-black text-white leading-none">AI Summary in 1.4s</p>
            </div>
          </div>

        </div>

        {/* Customer testimonial quote */}
        <div className="space-y-4 max-w-md relative z-10 self-start">
          <p className="font-body text-slate-350 italic text-sm sm:text-base leading-relaxed">
            "ExcelViz transformed how our finance team reports quarterly data. The AI summaries alone save us 3 hours every week."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-[10px] font-heading font-black text-cyan-400">
              RS
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-sm text-white leading-none mb-1">Riya Sharma</h4>
              <p className="font-body text-xs text-slate-500">Financial Analyst, <span className="font-medium text-slate-400">FinTrack</span></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;
