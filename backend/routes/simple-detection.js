const express = require('express');
const router = express.Router();

// Simple detection routes for demo
router.post('/analyze', (req, res) => {
  const { content, type, language = 'en' } = req.body;
  
  if (!content) {
    return res.status(400).json({ 
      error: 'Content is required' 
    });
  }

  // Mock analysis
  const riskScore = Math.floor(Math.random() * 100);
  const riskLevel = riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW';
  
  const analysis = {
    riskScore,
    riskLevel,
    threats: [
      {
        type: 'SUSPICIOUS_URL',
        severity: riskLevel,
        description: 'Detected potentially suspicious URL pattern'
      }
    ],
    recommendations: [
      'Verify the sender before taking any action',
      'Do not click on suspicious links',
      'Report if you believe this is a threat'
    ],
    language,
    timestamp: new Date().toISOString()
  };

  res.json({
    success: true,
    analysis
  });
});

router.get('/stats', (req, res) => {
  const stats = {
    totalScans: 15420,
    threatsDetected: 3240,
    highRiskThreats: 890,
    mediumRiskThreats: 1450,
    lowRiskThreats: 900,
    lastUpdated: new Date().toISOString()
  };

  res.json({
    success: true,
    stats
  });
});

module.exports = router;