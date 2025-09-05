const express = require('express');
const router = express.Router();
const DetectionService = require('../services/detectionService');

// Real-time content analysis
router.post('/analyze', async (req, res) => {
  try {
    const { content, type, language = 'en' } = req.body;
    
    if (!content || !type) {
      return res.status(400).json({ 
        error: 'Content and type are required' 
      });
    }

    const analysis = await DetectionService.analyzeContent({
      content,
      type,
      language,
      userId: req.user?.id
    });

    res.json({
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Analysis failed',
      message: error.message 
    });
  }
});

// Batch analysis for multiple items
router.post('/analyze/batch', async (req, res) => {
  try {
    const { items, language = 'en' } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ 
        error: 'Items array is required' 
      });
    }

    const results = [];
    
    for (const item of items) {
      try {
        const analysis = await DetectionService.analyzeContent({
          content: item.content,
          type: item.type,
          language,
          userId: req.user?.id
        });
        
        results.push({
          id: item.id,
          success: true,
          analysis: analysis
        });
      } catch (error) {
        results.push({
          id: item.id,
          success: false,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      results: results
    });

  } catch (error) {
    console.error('Batch analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Batch analysis failed',
      message: error.message 
    });
  }
});

// URL reputation check
router.post('/check-url', async (req, res) => {
  try {
    const { url, language = 'en' } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required' 
      });
    }

    const analysis = await DetectionService.analyzeUrl(url, language);

    res.json({
      success: true,
      url: url,
      analysis: analysis
    });

  } catch (error) {
    console.error('URL check error:', error);
    res.status(500).json({ 
      success: false,
      error: 'URL check failed',
      message: error.message 
    });
  }
});

// Page content analysis for browser extension
router.post('/scan-page', async (req, res) => {
  try {
    const pageData = req.body;
    
    if (!pageData.url) {
      return res.status(400).json({ 
        error: 'Page URL is required' 
      });
    }

    const analysis = await DetectionService.scanPageContent(pageData);

    res.json({
      success: true,
      pageAnalysis: analysis
    });

  } catch (error) {
    console.error('Page scan error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Page scan failed',
      message: error.message 
    });
  }
});

// Get threat statistics
router.get('/stats', async (req, res) => {
  try {
    // This would typically query database for real statistics
    const stats = {
      totalScans: 15420,
      threatsDetected: 3240,
      highRiskThreats: 890,
      mediumRiskThreats: 1450,
      lowRiskThreats: 900,
      topThreatTypes: [
        { type: 'Phishing URLs', count: 1250, percentage: 38.5 },
        { type: 'Suspicious Keywords', count: 950, percentage: 29.3 },
        { type: 'Fake Domains', count: 680, percentage: 21.0 },
        { type: 'Urgency Manipulation', count: 360, percentage: 11.1 }
      ],
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      stats: stats
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get statistics' 
    });
  }
});

// Report false positive/negative
router.post('/feedback', async (req, res) => {
  try {
    const { scanId, feedback, actualRisk, comments } = req.body;
    
    if (!scanId || !feedback) {
      return res.status(400).json({ 
        error: 'Scan ID and feedback are required' 
      });
    }

    // Store feedback for model improvement
    const feedbackRecord = {
      scanId,
      feedback, // 'correct', 'false_positive', 'false_negative'
      actualRisk,
      comments,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    };

    // In production, this would be stored in database
    console.log('User feedback received:', feedbackRecord);

    res.json({
      success: true,
      message: 'Feedback recorded successfully',
      feedbackId: 'feedback_' + Date.now()
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to record feedback' 
    });
  }
});

// Test endpoint for various threat types
router.get('/test-samples', (req, res) => {
  const testSamples = {
    phishing: [
      "URGENT: Your PayPal account has been limited. Click here to restore access immediately: http://paypal-security.malicious-site.com",
      "Congratulations! You've won $50,000 in the international lottery! Claim your prize now: https://lottery-winner.fake-site.org",
      "Security Alert: Suspicious login detected. Verify your identity: https://amazon-security.phishing-site.net"
    ],
    legitimate: [
      "Your monthly bank statement is ready for download in your secure online banking portal.",
      "Thank you for your recent purchase. Your order #12345 will be delivered by Friday.",
      "Reminder: Your scheduled meeting with the team is tomorrow at 2 PM in Conference Room A."
    ],
    urls: {
      suspicious: [
        "http://paypal-verification.secure-login.tk",
        "https://amazon-update.account-security.ml",
        "http://192.168.1.100/login.php"
      ],
      legitimate: [
        "https://www.paypal.com/signin",
        "https://amazon.com/your-account",
        "https://github.com/project/repo"
      ]
    }
  };

  res.json({
    success: true,
    testSamples: testSamples
  });
});

module.exports = router;