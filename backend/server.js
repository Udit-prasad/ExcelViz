const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
connectDB();

const app = express();

// CORS configuration for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const registerApiRoutes = require('./api');

// Register all API routes
registerApiRoutes(app);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Excel Vista Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server started on port ${PORT}`);
  console.log(` Excel Vista Backend is running`);
  console.log(` Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5000'}`);
});