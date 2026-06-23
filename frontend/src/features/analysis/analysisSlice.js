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
  chartType: 'bar',
  xAxis: '',
  yAxis: '',
  loading: false,
  error: null,
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
    loadExistingAnalysis: (state, action) => {
      const analysis = action.payload;
      state.uploadedFile = analysis.fileName;
      state.columns = analysis.columns || [];
      state.analysisData = analysis;
      state.chartData = analysis.chartData || null;
      state.chartType = analysis.chartType || 'bar';
      state.xAxis = analysis.xAxis || '';
      state.yAxis = analysis.yAxis || '';
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
      // Generate Chart
      .addCase(generateChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload.chartData;
        state.analysisData = {
          ...state.analysisData,
          ...action.payload.analysis,
        };
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
  loadExistingAnalysis
} = analysisSlice.actions;

export default analysisSlice.reducer;
