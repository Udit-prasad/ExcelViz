import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../features/auth/authSlice';
import PaywallScreen from './PaywallScreen';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, [token, isAuthenticated, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 1. Calculate trial duration (14 days limit)
  let isTrialExpired = false;
  if (user && user.createdAt) {
    const createdDate = new Date(user.createdAt);
    const msSinceCreation = Date.now() - createdDate.getTime();
    const daysSinceCreation = msSinceCreation / (1000 * 60 * 60 * 24);
    isTrialExpired = daysSinceCreation > 14 && !user.isPremium;
  }

  // 2. Allow expired users to access the Profile tab (to manage logs, billings, logout)
  const isProfilePage = window.location.pathname === '/profile';

  if (isTrialExpired && !isProfilePage) {
    return <PaywallScreen />;
  }

  return children;
};

export default ProtectedRoute; 