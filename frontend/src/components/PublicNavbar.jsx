import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const PublicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/product', label: 'Product Tour' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B0F19]/80 backdrop-blur-2xl shadow-xl shadow-cyan-950/10 border-b border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow"
            >
              <span className="text-white font-heading font-black text-xl">E</span>
            </motion.div>
            <span className="text-2xl font-heading font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              ExcelViz
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `font-body text-sm font-semibold tracking-wide transition-colors ${
                    isActive 
                      ? 'text-cyan-400 text-shadow-sm shadow-cyan-500/20' 
                      : 'text-slate-400 hover:text-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="font-body text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Dashboard
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="px-4 py-2 border border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl font-body text-sm font-bold transition-all"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="font-body text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Log In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 text-white px-5 py-2.5 rounded-xl font-body text-sm font-bold transition-all block"
                  >
                    Start Free
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F1623] border-b border-white/5 overflow-hidden shadow-2xl absolute top-full left-0 right-0 z-40"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `font-body text-base font-semibold py-1.5 border-b border-white/5 transition-colors ${
                      isActive 
                        ? 'text-cyan-400' 
                        : 'text-slate-400 hover:text-slate-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="flex flex-col gap-3 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center font-body text-base font-bold py-2.5 text-slate-350 hover:text-cyan-400 transition-colors border border-white/10 rounded-xl bg-white/5"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-center font-body text-base font-bold py-2.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center font-body text-base font-bold py-2.5 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-body text-base font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                    >
                      Start Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PublicNavbar;
