const { Router } = require('express');
const { register, login, getProfile, updateProfile, forgotPassword, resetPassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
