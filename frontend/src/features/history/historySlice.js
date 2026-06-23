import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      const response = await axios.get(`${API_URL}/analysis/history`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch history');
    }
  }
);

export const deleteAnalysis = createAsyncThunk(
  'history/deleteAnalysis',
  async (analysisId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      await axios.delete(`${API_URL}/analysis/${analysisId}`, config);
      return analysisId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to delete analysis');
    }
  }
);

const initialState = {
  history: [],
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Analysis
      .addCase(deleteAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.history = state.history.filter(item => item._id !== action.payload);
      })
      .addCase(deleteAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = historySlice.actions;
export default historySlice.reducer;