/**
 * app.js
 * Express application configuration registering middleware and routes.
 * Deployed on Render; frontend lives separately on Vercel.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
const historyRoutes = require('./routes/historyRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS — allow the Vercel frontend URL (set FRONTEND_URL in Render env vars)
// and localhost for local development.
const allowedOrigins = [
  process.env.FRONTEND_URL,          // e.g. https://your-app.vercel.app
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (e.g. curl/health checks) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/image', imageRoutes);
app.use('/api/history', historyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend service is healthy' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
