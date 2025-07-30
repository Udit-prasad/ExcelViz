const { Schema, model } = require('mongoose');

const AnalysisSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  originalName: String,
  columns: [String],
  chartType: String,
  xAxis: String,
  yAxis: String,
  chartData: Object,
  aiInsights: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Analysis', AnalysisSchema);