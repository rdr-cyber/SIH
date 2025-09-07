const express = require('express');
const router = express.Router();

// Simple authentication routes for demo
router.post('/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Registration successful',
    user: { id: 'demo_user', email: 'demo@example.com' }
  });
});

router.post('/login', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login successful',
    token: 'demo_token',
    user: { id: 'demo_user', email: 'demo@example.com' }
  });
});

router.get('/profile', (req, res) => {
  res.json({ 
    success: true,
    user: { id: 'demo_user', email: 'demo@example.com', name: 'Demo User' }
  });
});

module.exports = router;