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

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/phishing-detector', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/detection', require('./backend/routes/detection'));
app.use('/api/awareness', require('./backend/routes/awareness'));
app.use('/api/blockchain', require('./backend/routes/blockchain'));
app.use('/api/chatbot', require('./backend/routes/chatbot'));

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('scan-request', async (data) => {
    try {
      // Real-time scanning logic will be implemented here
      const result = await require('./backend/services/detectionService').analyzeContent(data);
      socket.emit('scan-result', result);
    } catch (error) {
      socket.emit('scan-error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: http://localhost:${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});