import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import analysisReducer from '../features/analysis/analysisSlice';
import historyReducer from '../features/history/historySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    analysis: analysisReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
}); 
