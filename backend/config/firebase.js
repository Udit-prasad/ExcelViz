const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Format escaped newlines commonly used by environment variable providers.
let privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (privateKey && (privateKey.startsWith('"') || privateKey.startsWith("'"))) {
  privateKey = privateKey.substring(1, privateKey.length - 1);
}

if (!admin.apps.length) {
  try {
    const isPlaceholder = process.env.FIREBASE_PROJECT_ID === 'your-firebase-project-id';
    
    if (process.env.FIREBASE_PROJECT_ID && !isPlaceholder && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin initialized from environment variables.');
    } else {
      // Initialize in sandbox mode so the server boots cleanly for development
      admin.initializeApp({
        projectId: 'excelviz-sandbox',
      });
      console.warn('Firebase credentials are missing or still use placeholder values in backend/.env.');
      console.warn('Firebase Admin initialized in sandbox mode. Cloud features require valid credentials.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error.message);
  }
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth
};
