import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // For requesting a reset link
  const [email, setEmail] = useState('');
  
  // For submitting a new password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Request a reset link handler
  const handleRequestLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset email sent! Check your inbox for instructions.');
        setEmail('');
      } else {
        const data = await response.json();
        setError(data.msg || 'Error requesting reset link. Please verify your email.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit new password handler
  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.msg || 'Error resetting password. The link may have expired.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const hasToken = !!token;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 sm:p-12 font-body relative overflow-hidden text-slate-800">
      
      {/* Decorative glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-slate-150 rounded-2xl p-8 sm:p-10 shadow-xl relative z-10 space-y-8"
      >
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link to="/" className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 mb-6">
            <span className="text-white font-heading font-black text-lg">E</span>
          </Link>
          <h2 className="text-2xl font-heading font-extrabold tracking-tight text-slate-900 text-center">
            {hasToken ? 'Choose a new password' : 'Reset your password'}
          </h2>
          <p className="text-slate-500 text-xs font-semibold text-center mt-2 max-w-xs leading-relaxed">
            {hasToken 
              ? 'Enter your new security credentials below to regain account access'
              : 'Enter your account email and we will send you a verification recovery link'
            }
          </p>
        </div>

        {message && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-600 font-bold leading-relaxed">{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600 font-bold leading-relaxed">{error}</p>
          </div>
        )}

        {hasToken ? (
          /* Submitting a New Password */
          <form className="space-y-5" onSubmit={handleSubmitNewPassword}>
            <div>
              <label htmlFor="password" className="block text-xs font-heading font-black text-slate-400 uppercase tracking-widest mb-2">
                New Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all text-sm font-semibold"
                placeholder="Enter new password (min. 6 characters)"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-heading font-black text-slate-400 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all text-sm font-semibold"
                placeholder="Repeat your password"
                minLength={6}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-heading font-extrabold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg shadow-blue-500/10 transition-all"
            >
              {loading ? 'Saving...' : 'Reset Password'}
            </motion.button>
          </form>
        ) : (
          /* Requesting a Reset Link */
          <form className="space-y-5" onSubmit={handleRequestLink}>
            <div>
              <label htmlFor="email" className="block text-xs font-heading font-black text-slate-400 uppercase tracking-widest mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all text-sm font-semibold"
                placeholder="name@company.com"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-heading font-extrabold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg shadow-blue-500/10 transition-all"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </motion.button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="font-heading text-xs font-extrabold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default ResetPassword;
