const { Router } = require('express');
const { single } = require('../middleware/multer');
const auth = require('../middleware/auth');
const { uploadExcel } = require('../controllers/uploadController');

const router = Router();

router.post('/', auth, single('file'), uploadExcel);

module.exports = router;