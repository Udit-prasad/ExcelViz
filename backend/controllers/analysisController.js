const Analysis = require('../models/Analysis');

const saveAnalysis = async (req, res) => {
  const { analysisId, chartType, xAxis, yAxis, chartData, aiInsights } = req.body;
  try {
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) return res.status(404).json({ msg: 'Analysis not found' });

    analysis.chartType = chartType;
    analysis.xAxis = xAxis;
    analysis.yAxis = yAxis;
    analysis.chartData = chartData;
    if (aiInsights) analysis.aiInsights = aiInsights;
    await analysis.save();

    res.json(analysis);
  } catch (err) {
    console.error('Save analysis error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const generateChart = async (req, res) => {
  const { analysisId, chartType, xAxis, yAxis } = req.body;
  try {
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) return res.status(404).json({ msg: 'Analysis not found' });

    // Generate chart data based on the uploaded file
    // This is a placeholder - you'll need to implement actual chart generation logic
    const chartData = {
      type: chartType,
      xAxis: xAxis,
      yAxis: yAxis,
      data: [] // This should contain the actual chart data
    };

    analysis.chartType = chartType;
    analysis.xAxis = xAxis;
    analysis.yAxis = yAxis;
    analysis.chartData = chartData;
    await analysis.save();

    res.json({ chartData, analysis });
  } catch (err) {
    console.error('Generate chart error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// AI/statistical insights generator for chart data
const generateAIInsights = async (req, res) => {
  const { chartData } = req.body;
  if (!chartData || !Array.isArray(chartData.data) || chartData.data.length === 0) {
    return res.status(400).json({ msg: 'No chart data provided' });
  }

  // For simplicity, assume chartData.data is an array of numbers or objects with x/y/z
  let values = [];
  if (typeof chartData.data[0] === 'number') {
    values = chartData.data;
  } else if (typeof chartData.data[0] === 'object') {
    // Try to extract y (for 2D) or z (for 3D) values
    values = chartData.data.map(d => d.y !== undefined ? d.y : (d.z !== undefined ? d.z : null)).filter(v => v !== null);
  }

  if (values.length === 0) {
    return res.status(400).json({ msg: 'No numeric values found in chart data' });
  }

  // Basic stats
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const trend = values[values.length - 1] > values[0] ? 'increasing' : (values[values.length - 1] < values[0] ? 'decreasing' : 'stable');

  // Compose insights
  const insights = `Mean: ${mean.toFixed(2)}, Min: ${min}, Max: ${max}, Trend: ${trend}.`;

  res.json({ insights });
};

module.exports = {
  saveAnalysis,
  getHistory,
  generateChart,
  generateAIInsights // Export the new function
};