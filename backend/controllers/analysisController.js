const { db } = require('../config/firebase');
const { readFile, utils } = require('xlsx');
const { basename, join } = require('path');

const getHistory = async (req, res) => {
  try {
    const snapshot = await db.collection('analyses')
      .where('user', '==', req.user.id)
      .get();
    
    const history = [];
    snapshot.forEach(doc => {
      history.push({
        _id: doc.id,
        id: doc.id,
        ...doc.data()
      });
    });

    // Sort in memory by createdAt descending
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(history);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const generateChart = async (req, res) => {
  const { analysisId, chartType, xAxis, yAxis } = req.body;

  if (!analysisId || !chartType || !xAxis || !yAxis) {
    return res.status(400).json({ msg: 'Analysis ID, chart type, and both axes are required' });
  }

  try {
    const docRef = db.collection('analyses').doc(analysisId);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ msg: 'Analysis not found' });

    const analysisData = doc.data();
    if (analysisData.user !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // Read the uploaded file to get the actual data
    const filePath = join(__dirname, '..', 'uploads', analysisData.fileName);
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(worksheet);

    // Extract data for the specified axes
    const chartPoints = jsonData
      .map((row) => ({ label: row[xAxis], value: parseFloat(row[yAxis]) }))
      .filter((point) => point.label !== undefined && Number.isFinite(point.value));
    const chartLabels = chartPoints.map((point) => point.label);
    const chartValues = chartPoints.map((point) => point.value);

    // Create chart data structure
    const chartData = {
      labels: chartLabels,
      datasets: [{
        label: yAxis,
        data: chartValues,
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)', // blue-500
          'rgba(239, 68, 68, 0.5)',  // red-500
          'rgba(16, 185, 129, 0.5)', // green-500
          'rgba(245, 158, 11, 0.5)', // amber-500
          'rgba(139, 92, 246, 0.5)'  // violet-500
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)', // blue-500
          'rgba(239, 68, 68, 1)',  // red-500
          'rgba(16, 185, 129, 1)', // green-500
          'rgba(245, 158, 11, 1)', // amber-500
          'rgba(139, 92, 246, 1)'  // violet-500
        ],
        borderWidth: 1,
      }]
    };

    const updatePayload = {
      chartType,
      xAxis,
      yAxis,
      chartData
    };

    await docRef.update(updatePayload);

    const updatedDoc = await docRef.get();
    const returnedAnalysis = {
      _id: updatedDoc.id,
      id: updatedDoc.id,
      ...updatedDoc.data()
    };

    res.json({ chartData, analysis: returnedAnalysis });
  } catch (err) {
    console.error('Generate chart error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// AI/statistical insights generator for chart data
const generateAIInsights = async (req, res) => {
  const { chartData } = req.body;
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return res.status(400).json({ msg: 'No chart data provided' });
  }

  const dataset = chartData.datasets[0];
  const values = dataset.data.filter(val => typeof val === 'number' && !isNaN(val));
  
  if (values.length === 0) {
    return res.status(400).json({ msg: 'No numeric values found in chart data' });
  }

  // Calculate basic statistics
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  // Determine trend (simple calculation based on first and last values)
  const trend = values.length > 1 
    ? values[values.length - 1] > values[0] ? 'increasing' 
      : values[values.length - 1] < values[0] ? 'decreasing' : 'stable'
    : 'stable';

  // Create insights
  const insights = `Statistical Summary: Mean: ${mean.toFixed(2)}, Min: ${min}, Max: ${max}, Trend: ${trend}.`;

  res.json({ insights });
};

// Delete analysis by ID
const deleteAnalysis = async (req, res) => {
  try {
    const docRef = db.collection('analyses').doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ msg: 'Analysis not found' });
    }
    
    const analysisData = doc.data();
    
    // Check if the user owns this analysis
    if (analysisData.user !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await docRef.delete();
    res.json({ msg: 'Analysis deleted successfully' });
  } catch (err) {
    console.error('Delete analysis error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const downloadAnalysisFile = async (req, res) => {
  try {
    const doc = await db.collection('analyses').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ msg: 'Analysis not found' });
    }

    const analysisData = doc.data();
    if (analysisData.user !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const filePath = join(__dirname, '..', 'uploads', basename(analysisData.fileName));
    res.download(filePath, analysisData.originalName || analysisData.fileName);
  } catch (err) {
    console.error('Download analysis error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getHistory,
  generateChart,
  generateAIInsights,
  deleteAnalysis,
  downloadAnalysisFile
};
