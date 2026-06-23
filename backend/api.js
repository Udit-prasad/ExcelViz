const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const analysisRoutes = require('./routes/analysis');
const aiRoutes = require('./routes/ai');
const paymentRoutes = require('./routes/payment');

function registerApiRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/analysis', analysisRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/payment', paymentRoutes);
}

module.exports = registerApiRoutes;