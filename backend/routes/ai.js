const { Router } = require('express');
const { generateInsights, generateSummaryReport, getInsightsForAnalysis } = require('../controllers/aiController');
const auth = require('../middleware/auth');
const trialCheck = require('../middleware/trialCheck');

const router = Router();

router.post('/insights', auth, trialCheck, generateInsights);
router.get('/insights/:analysisId', auth, trialCheck, getInsightsForAnalysis);
router.post('/summary', auth, trialCheck, generateSummaryReport);

module.exports = router;