const { Router } = require('express');
const { single } = require('../middleware/multer');
const auth = require('../middleware/auth');
const trialCheck = require('../middleware/trialCheck');
const { uploadExcel } = require('../controllers/uploadController');

const router = Router();

router.post('/', auth, trialCheck, single('file'), uploadExcel);

module.exports = router;