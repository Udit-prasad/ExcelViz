const { Router } = require('express');
const auth = require('../middleware/auth');
const trialCheck = require('../middleware/trialCheck');
const { getHistory, generateChart, generateAIInsights, deleteAnalysis, downloadAnalysisFile } = require('../controllers/analysisController');

const router = Router();

router.post('/generate-chart', auth, trialCheck, generateChart);
router.post('/ai-insights', auth, trialCheck, generateAIInsights);
router.get('/history', auth, getHistory);
router.get('/:id/download', auth, downloadAnalysisFile);
router.delete('/:id', auth, deleteAnalysis);

module.exports = router;
