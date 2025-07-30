const { Router } = require('express');
const auth = require('../middleware/auth');
const { getAllUsers, getAllAnalyses } = require('../controllers/adminController');

const router = Router();

// Only allow admin users
router.get('/users', auth, async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: 'Admin only' });
  next();
}, getAllUsers);

router.get('/analyses', auth, async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: 'Admin only' });
  next();
}, getAllAnalyses);

module.exports = router;