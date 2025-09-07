const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('frontend/build'));

// Database connection (optional for demo)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('⚠️  MongoDB not available - running in demo mode'));
} else {
  console.log('⚠️  MongoDB not configured - running in demo mode');
}

// Routes
app.use('/api/auth', require('./backend/routes/simple-auth'));
app.use('/api/detection', require('./backend/routes/simple-detection'));
app.use('/api/chatbot', require('./backend/routes/simple-chatbot'));

// Simple awareness route
app.get('/api/awareness/quizzes', (req, res) => {
  res.json({
    success: true,
    quizzes: {
      basic: {
        id: 'basic',
        title: 'Basic Security',
        description: 'Learn fundamental cybersecurity concepts',
        difficulty: 'beginner'
      }
    }
  });
});

// Simple blockchain route
app.get('/api/blockchain/status', (req, res) => {
  res.json({
    success: true,
    status: {
      blockchainEnabled: false,
      message: 'Running in demo mode'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler for API routes (must be after all defined API routes)
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`
  });
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('scan-request', async (data) => {
    try {
      // Simple mock analysis for demo
      const result = {
        riskScore: Math.floor(Math.random() * 100),
        riskLevel: 'MEDIUM',
        threats: ['SUSPICIOUS_URL'],
        timestamp: new Date().toISOString()
      };
      socket.emit('scan-result', result);
    } catch (error) {
      socket.emit('scan-error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Export app and server for testing
module.exports = app;
module.exports.server = server;

const PORT = process.env.PORT || 5001;

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend URL: http://localhost:${PORT}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  });
}