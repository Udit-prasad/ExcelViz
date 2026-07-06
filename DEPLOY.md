# ExcelViz Deployment Guide (Google Cloud & Firebase Hosting)

This guide walks you through deploying the ExcelViz frontend to **Firebase Hosting** and the backend to **Google Cloud Run**. Both are Google services and offer generous free tiers.

---

## Prerequisites
1. Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
2. Install the [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli):
   ```bash
   npm install -g firebase-tools
   ```
3. Create a project in the [Firebase Console](https://console.firebase.google.com) (this automatically creates a Google Cloud project with the same ID).

---

## 1. Firebase Authentication Setup

ExcelViz uses simple Email/Password authentication powered securely by Firebase on the backend.
1. Go to the Firebase Console -> **Build** -> **Authentication** -> **Get Started**.
2. Enable **Email/Password** sign-in provider.

---

## 2. Deploying the Backend to Google Cloud Run

Google Cloud Run serves your Node.js Docker container securely and scales down to zero when not in use (saving money).

### Step 1: Login to Google Cloud CLI
```bash
gcloud auth login
gcloud config set project your-firebase-project-id
```

### Step 2: Build and Deploy Container
Run this command from the root folder (it will use the Dockerfile located in the `backend` folder):
```bash
gcloud run deploy excelviz-backend --source ./backend --region us-central1 --allow-unauthenticated
```
- During deployment, choose to **allow unauthenticated invocations** (this makes your API public).
- Once finished, copy the **Service URL** provided by Google Cloud Run. This is your backend production URL.

### Step 3: Configure Backend Environment Variables
Configure the environment variables in Google Cloud Run Console or via CLI:
```bash
gcloud run services update excelviz-backend --region us-central1 \
  --set-env-vars FRONTEND_URL=https://your-firebase-project-id.web.app \
  --set-env-vars FIREBASE_PROJECT_ID=your-firebase-project-id \
  --set-env-vars FIREBASE_CLIENT_EMAIL=your-service-account-email \
  --set-env-vars FIREBASE_PRIVATE_KEY="your-private-key" \
  --set-env-vars RAZORPAY_KEY_ID=your_razorpay_key_id \
  --set-env-vars RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## 3. Deploying the Frontend to Firebase Hosting

Firebase Hosting provides fast and secure static site hosting.

### Step 1: Bind Firebase CLI
From the root workspace directory:
```bash
firebase login
firebase use --add
```
Select the Firebase project ID you created.

### Step 2: Build the React Application
Configure the backend endpoint in `frontend/.env`:
```env
REACT_APP_API_URL=https://your-backend-cloud-run-url.a.run.app/api
```
Build your optimized React bundle:
```bash
npm run build
```
This generates the compiled files inside `frontend/build`.

### Step 3: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```
Once deployed, Firebase Hosting will provide your live URL (usually `https://your-firebase-project-id.web.app`). Make sure this URL matches the `FRONTEND_URL` env variable in Cloud Run!

---

## 4. Local Sandbox Testing
To run the application locally without any cloud setup:
1. Copy `backend/.env.example` to `backend/.env`.
2. Do not fill out any variables (leave them empty or as defaults). The backend will detect this and automatically launch in **Mock Sandbox Mode** (using `backend/local_db.json` for storage and our interactive custom card-checkout page to simulate Razorpay upgrades).
3. Run `npm run dev` to start the local hot-reloading dashboard.
