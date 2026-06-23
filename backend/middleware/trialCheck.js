const { db } = require('../config/firebase');

const trialCheck = async (req, res, next) => {
  try {
    // 1. Retrieve the user record from Firestore
    const userDoc = await db.collection('users').doc(req.user.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    const userData = userDoc.data();
    
    // Fallback if createdAt is somehow missing (default to current time)
    const createdAtStr = userData.createdAt || new Date().toISOString();
    const createdDate = new Date(createdAtStr);
    
    // Calculate difference in days
    const msSinceCreation = Date.now() - createdDate.getTime();
    const daysSinceCreation = msSinceCreation / (1000 * 60 * 60 * 24);

    // 14 day free trial limit
    const isTrialExpired = daysSinceCreation > 14;

    // Block request if trial expired and the user hasn't purchased premium
    if (isTrialExpired && !userData.isPremium) {
      return res.status(402).json({
        msg: 'Your 14-day free trial has expired. Please upgrade to ExcelViz Pro to continue.',
        trialExpired: true
      });
    }

    // Limit to 1 visualization for free trial users
    if (!userData.isPremium) {
      const isGenerateChartRequest = req.originalUrl.includes('generate-chart');
      
      if (isGenerateChartRequest) {
        const analysesSnapshot = await db.collection('analyses').where('user', '==', req.user.id).get();
        let activeChartsCount = 0;
        let currentAnalysisHasChart = false;

        analysesSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.chartType) {
            activeChartsCount++;
            if (req.body.analysisId && doc.id === req.body.analysisId) {
              currentAnalysisHasChart = true;
            }
          }
        });

        // If they already generated 1 chart, and the current document doesn't have a chart yet
        if (activeChartsCount >= 1 && !currentAnalysisHasChart) {
          return res.status(402).json({
            msg: 'Free trial is limited to 1 visualization. Please upgrade to ExcelViz Pro to continue.',
            trialLimitExceeded: true
          });
        }
      }
    }

    // User is within trial or has premium status; allow proceeding
    next();
  } catch (err) {
    console.error('Trial check middleware error:', err);
    res.status(500).json({ msg: 'Server error verifying subscription' });
  }
};

module.exports = trialCheck;
