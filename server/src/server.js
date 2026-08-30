require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect Database
connectDB();

// API Routes
app.use('/api', apiRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    name: 'Chess Insights API',
    tagline: 'Analyze. Understand. Outplay.',
    docs: '/api/health',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Chess Insights REST API running on port ${PORT} (http://localhost:${PORT})`);
});

module.exports = app;