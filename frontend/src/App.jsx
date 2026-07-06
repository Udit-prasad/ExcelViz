import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Analysis from './pages/Analysis';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';
import CookieConsent from './components/CookieConsent';

// Reusable Marketing Layout components
import PublicNavbar from './components/PublicNavbar';
import PublicFooter from './components/PublicFooter';

// Newly created public marketing pages
import Landing from './pages/Landing';
import ProductTour from './pages/ProductTour';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Checkout from './pages/Checkout';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const path = location.pathname;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // Determine if active route is a public marketing/auth page
  const isPublicRoute = 
    path === '/' ||
    path === '/product' ||
    path === '/solutions' ||
    path === '/pricing' ||
    path === '/about' ||
    path === '/blog' ||
    path.startsWith('/blog/') ||
    path === '/login' ||
    path === '/register' ||
    path === '/checkout' ||
    path === '/reset-password' ||
    path.startsWith('/reset-password/');

  if (isPublicRoute) {
    const showNavbarAndFooter = 
      path !== '/login' && 
      path !== '/register' && 
      !path.startsWith('/reset-password');

    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-200 flex flex-col font-body antialiased relative public-website">
        {showNavbarAndFooter && (
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-45"
            >
              <source src="/video-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0B0F19]/45 to-[#0B0F19]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0B0F19_85%)]" />
          </div>
        )}
        {showNavbarAndFooter && <PublicNavbar />}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/product" element={<ProductTour />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {showNavbarAndFooter && <PublicFooter />}
        <CookieConsent />
      </div>
    );
  }

  // Dashboard Private Layout
  return (
    <div className="min-h-screen bg-[#0B0F19] transition-colors duration-500 flex flex-col relative overflow-hidden font-sans antialiased text-slate-200">
      {/* Dynamic Luminous Backlighting */}
      <div className="glow-accent top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/15" />
      <div className="glow-accent bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/15" />

      <Navbar />
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6 relative z-10">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 glass-panel rounded-[24px] overflow-hidden shadow-2xl transition-all duration-300">
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analysis" 
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <CookieConsent />
    </div>
  );
}

export default App;
