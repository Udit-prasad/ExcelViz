import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-[#0B0F19]/60 backdrop-blur-3xl border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 pointer-events-auto">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow"
              >
                <span className="text-white font-heading font-black text-xl">E</span>
              </motion.div>
              <span className="text-2xl font-heading font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                ExcelViz
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ y: -1 }}>
              <Link 
                to="/about" 
                className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all"
              >
                About
              </Link>
            </motion.div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 bg-cyan-950/40 border border-cyan-500/20 rounded-full flex items-center justify-center ring-2 ring-transparent group-hover:ring-cyan-500 transition-all">
                    <span className="text-cyan-400 font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-slate-200 text-sm font-semibold hidden sm:block">
                    {user?.name}
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-white/5 hover:bg-rose-950/30 hover:border-rose-500/20 border border-white/10 text-slate-300 hover:text-rose-400 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-2">
                <motion.div whileHover={{ y: -1 }}>
                  <Link 
                    to="/login" 
                    className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all inline-block"
                  >
                    Start Free
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;