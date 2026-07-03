const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Format escaped newlines commonly used by environment variable providers.
let privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (privateKey && (privateKey.startsWith('"') || privateKey.startsWith("'"))) {
  privateKey = privateKey.substring(1, privateKey.length - 1);
}

const isPlaceholder = process.env.FIREBASE_PROJECT_ID === 'your-firebase-project-id';
const hasRealCredentials = process.env.FIREBASE_PROJECT_ID && !isPlaceholder && process.env.FIREBASE_CLIENT_EMAIL && privateKey && process.env.FIREBASE_WEB_API_KEY;
const isMock = !hasRealCredentials;

let db;
let auth;

if (!isMock) {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin initialized from environment variables.');
    } catch (error) {
      console.error('Firebase Admin initialization error:', error.message);
    }
  }
  db = admin.firestore();
  auth = admin.auth();
} else {
  console.warn('Firebase credentials are missing or still use placeholder values in backend/.env.');
  console.warn('Initializing local mock Firebase database (local_db.json) and auth server...');

  const DB_PATH = path.join(__dirname, '..', 'local_db.json');

  function readDb() {
    try {
      if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify({ authUsers: {}, users: {}, analyses: {} }, null, 2));
      }
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (err) {
      console.error('Error reading mock db:', err);
      return { authUsers: {}, users: {}, analyses: {} };
    }
  }

  function writeDb(data) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error writing mock db:', err);
    }
  }

  class MockDocRef {
    constructor(collectionName, docId) {
      this.collectionName = collectionName;
      this.id = docId;
    }

    async get() {
      const data = readDb();
      const docData = data[this.collectionName]?.[this.id];
      return {
        id: this.id,
        exists: !!docData,
        data: () => docData ? { ...docData } : undefined
      };
    }

    async set(data) {
      const dbData = readDb();
      if (!dbData[this.collectionName]) dbData[this.collectionName] = {};
      dbData[this.collectionName][this.id] = { ...data };
      writeDb(dbData);
      return this;
    }

    async update(data) {
      const dbData = readDb();
      if (!dbData[this.collectionName]) dbData[this.collectionName] = {};
      const existing = dbData[this.collectionName][this.id] || {};
      dbData[this.collectionName][this.id] = { ...existing, ...data };
      writeDb(dbData);
      return this;
    }

    async delete() {
      const dbData = readDb();
      if (dbData[this.collectionName] && dbData[this.collectionName][this.id]) {
        delete dbData[this.collectionName][this.id];
        writeDb(dbData);
      }
      return this;
    }
  }

  class MockCollectionRef {
    constructor(collectionName, filters = []) {
      this.collectionName = collectionName;
      this.filters = filters;
    }

    doc(docId) {
      return new MockDocRef(this.collectionName, docId);
    }

    where(field, op, value) {
      return new MockCollectionRef(this.collectionName, [
        ...this.filters,
        { field, op, value }
      ]);
    }

    async add(data) {
      const dbData = readDb();
      if (!dbData[this.collectionName]) dbData[this.collectionName] = {};
      const newId = 'mock-' + this.collectionName + '-' + Math.random().toString(36).substring(2, 11);
      dbData[this.collectionName][newId] = { ...data };
      writeDb(dbData);
      return new MockDocRef(this.collectionName, newId);
    }

    async get() {
      const dbData = readDb();
      const items = dbData[this.collectionName] || {};
      let docs = Object.keys(items).map(id => ({
        id,
        data: () => ({ ...items[id] })
      }));

      for (const filter of this.filters) {
        const { field, op, value } = filter;
        docs = docs.filter(doc => {
          const docData = doc.data();
          if (op === '==') {
            return docData[field] === value;
          }
          return true;
        });
      }

      return {
        forEach: (callback) => {
          docs.forEach(callback);
        },
        docs,
        empty: docs.length === 0,
        size: docs.length
      };
    }
  }

  class MockAuth {
    async createUser(properties) {
      const dbData = readDb();
      if (!dbData.authUsers) dbData.authUsers = {};
      if (!dbData.users) dbData.users = {};
      
      const existingUser = Object.values(dbData.authUsers).find(u => u.email === properties.email);
      if (existingUser) {
        throw new Error('EMAIL_EXISTS');
      }

      const uid = 'mock-user-' + Math.random().toString(36).substring(2, 11);
      dbData.authUsers[uid] = {
        uid,
        email: properties.email,
        password: properties.password,
      };
      dbData.users[uid] = {
        name: properties.displayName || 'Anonymous User',
        email: properties.email,
        createdAt: new Date().toISOString()
      };
      writeDb(dbData);
      return { uid, email: properties.email, displayName: properties.displayName };
    }

    async getUser(uid) {
      const dbData = readDb();
      const user = dbData.users?.[uid];
      if (!user) throw new Error('User not found');
      return {
        uid,
        email: user.email,
        displayName: user.name
      };
    }

    async updateUser(uid, properties) {
      const dbData = readDb();
      if (!dbData.users?.[uid]) throw new Error('User not found');
      dbData.users[uid] = {
        ...dbData.users[uid],
        name: properties.displayName || dbData.users[uid].name,
        email: properties.email || dbData.users[uid].email
      };
      writeDb(dbData);
      return { uid, email: dbData.users[uid].email, displayName: dbData.users[uid].name };
    }

    async verifyIdToken(token) {
      if (!token || !token.startsWith('mock-token-')) {
        throw new Error('Invalid token');
      }
      const uid = token.replace('mock-token-', '');
      const dbData = readDb();
      const user = dbData.users?.[uid];
      if (!user) throw new Error('User not found or token expired');
      return {
        uid,
        email: user.email,
        name: user.name
      };
    }
  }

  db = {
    collection: (name) => new MockCollectionRef(name)
  };
  auth = new MockAuth();
}

module.exports = {
  admin,
  db,
  auth,
  isMock
};
