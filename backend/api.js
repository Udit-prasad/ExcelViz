const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const analysisRoutes = require('./routes/analysis');
const adminRoutes = require('./routes/admin');

function registerApiRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/analysis', analysisRoutes);
  app.use('/api/admin', adminRoutes);
}

module.exports = registerApiRoutes; 