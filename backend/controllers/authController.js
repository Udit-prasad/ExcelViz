const axios = require('axios');
const { auth, db } = require('../config/firebase');

const apiKeyMissingMessage = (action) =>
  `Server is missing FIREBASE_WEB_API_KEY inside backend/.env. Please configure this key to enable user ${action}.`;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const apiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Name, email, and password are required' });
  }

  if (!apiKey) {
    return res.status(400).json({ msg: apiKeyMissingMessage('registration') });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date().toISOString()
    });

    const loginResponse = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      { email, password, returnSecureToken: true }
    );

    res.json({
      token: loginResponse.data.idToken,
      user: {
        id: userRecord.uid,
        name,
        email
      }
    });
  } catch (err) {
    console.error('Firebase Register error:', err.response?.data?.error?.message || err.message);
    res.status(400).json({ msg: err.response?.data?.error?.message || err.message || 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const apiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  if (!apiKey) {
    return res.status(400).json({ msg: apiKeyMissingMessage('login') });
  }

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      { email, password, returnSecureToken: true }
    );

    const { idToken, localId } = response.data;
    const userRef = db.collection('users').doc(localId);
    const userDoc = await userRef.get();
    let name = 'User';

    if (userDoc.exists) {
      name = userDoc.data().name || name;
    } else {
      const firebaseUser = await auth.getUser(localId);
      name = firebaseUser.displayName || name;
      await userRef.set({
        name,
        email,
        createdAt: new Date().toISOString()
      });
    }

    res.json({
      token: idToken,
      user: {
        id: localId,
        name,
        email
      }
    });
  } catch (err) {
    const errorMsg = err.response?.data?.error?.message;
    console.error('Firebase Login error:', errorMsg || err.message);

    if (['EMAIL_NOT_FOUND', 'INVALID_PASSWORD', 'INVALID_LOGIN_CREDENTIALS'].includes(errorMsg)) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.status(500).json({ msg: errorMsg || 'Authentication failed' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const apiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }

  if (!apiKey) {
    return res.status(400).json({ msg: apiKeyMissingMessage('password reset') });
  }

  try {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      { requestType: 'PASSWORD_RESET', email }
    );
    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error('Firebase Forgot password error:', err.response?.data?.error?.message || err.message);
    res.status(500).json({ msg: 'Failed to dispatch password reset email. Ensure the email is registered.' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const apiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!token || !password) {
    return res.status(400).json({ msg: 'Reset token and new password are required' });
  }

  if (!apiKey) {
    return res.status(400).json({ msg: apiKeyMissingMessage('password reset') });
  }

  try {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
      { oobCode: token, newPassword: password }
    );
    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error('Firebase Reset password error:', err.response?.data?.error?.message || err.message);
    res.status(400).json({ msg: 'Invalid or expired reset token' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    res.json({
      id: userDoc.id,
      ...userDoc.data()
    });
  } catch (err) {
    console.error('Firebase Get profile error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ msg: 'Name and email are required' });
  }

  try {
    await auth.updateUser(req.user.id, {
      displayName: name,
      email
    });

    const userRef = db.collection('users').doc(req.user.id);
    await userRef.set({
      name,
      email,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const userDoc = await userRef.get();
    res.json({
      id: userDoc.id,
      ...userDoc.data()
    });
  } catch (err) {
    console.error('Firebase Update profile error:', err.message);
    res.status(400).json({ msg: err.message || 'Profile update failed' });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile
};
