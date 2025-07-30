import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const uploadFile = createAsyncThunk(
  'analysis/uploadFile',
  async (file, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(`${API_URL}/upload`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Upload failed');
    }
  }
);

export const saveAnalysis = createAsyncThunk(
  'analysis/saveAnalysis',
  async (analysisData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}/analysis/save`, analysisData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to save analysis');
    }
  }
);

export const generateChart = createAsyncThunk(
  'analysis/generateChart',
  async (chartConfig, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}/analysis/generate-chart`, chartConfig, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to generate chart');
    }
  }
);

const initialState = {
  uploadedFile: null,
  columns: [],
  analysisData: null,
  chartData: null,
  chartType: '2d',
  xAxis: '',
  yAxis: '',
  loading: false,
  error: null,
  success: null,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    clearAnalysis: (state) => {
      state.uploadedFile = null;
      state.columns = [];
      state.analysisData = null;
      state.chartData = null;
      state.xAxis = '';
      state.yAxis = '';
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload File
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFile = action.payload.fileName;
        state.columns = action.payload.columns;
        state.analysisData = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Analysis
      .addCase(saveAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Analysis saved successfully';
      })
      .addCase(saveAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate Chart
      .addCase(generateChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(generateChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setChartType, 
  setXAxis, 
  setYAxis, 
  clearAnalysis, 
  clearError, 
  clearSuccess 
} = analysisSlice.actions;

export default analysisSlice.reducer; 