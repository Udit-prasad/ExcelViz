import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import analysisReducer from '../features/analysis/analysisSlice';
import historyReducer from '../features/history/historySlice';
import uiReducer from '../features/ui/uiSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    analysis: analysisReducer,
    history: historyReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
}); 