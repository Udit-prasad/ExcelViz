const { auth } = require('../config/firebase');

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = { 
      id: decodedToken.uid, 
      email: decodedToken.email, 
      name: decodedToken.name || 'Anonymous User' 
    };
    next();
  } catch (err) {
    console.error('Firebase Auth token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid or expired' });
  }
};