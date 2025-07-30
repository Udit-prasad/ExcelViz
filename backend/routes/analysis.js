const { Router } = require('express');
const auth = require('../middleware/auth');
const { saveAnalysis, getHistory, generateChart, generateAIInsights } = require('../controllers/analysisController');

const router = Router();

router.post('/save', auth, saveAnalysis);
router.post('/generate-chart', auth, generateChart);
router.post('/ai-insights', auth, generateAIInsights);
router.get('/history', auth, getHistory);

module.exports = router;