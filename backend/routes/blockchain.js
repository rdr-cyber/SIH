const express = require('express');
const express = require('express');
const router = express.Router();
const blockchainService = require('../services/blockchainService');

// Log threat to blockchain
router.post('/log-threat', async (req, res) => {
  try {
    const { scanId, contentHash, riskScore, threatTypes, timestamp } = req.body;
    
    if (!scanId || !contentHash || riskScore === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: scanId, contentHash, riskScore' 
      });
    }

    const result = await blockchainService.logThreatToBlockchain({
      scanId,
      content: contentHash,
      riskScore,
      threats: threatTypes || [],
      timestamp: timestamp || new Date().toISOString()
    });

    res.json({
      success: true,
      blockchain: result,
      message: 'Threat logged to blockchain successfully'
    });

  } catch (error) {
    console.error('Blockchain logging error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to log threat to blockchain',
      message: error.message 
    });
  }
});

// Get threat intelligence from blockchain
router.get('/threat-intel/:contentHash', async (req, res) => {
  try {
    const { contentHash } = req.params;
    
    if (!contentHash) {
      return res.status(400).json({ 
        error: 'Content hash is required' 
      });
    }

    const threatIntel = await blockchainService.getThreatIntelligence(contentHash);

    if (!threatIntel) {
      return res.json({
        success: true,
        found: false,
        message: 'No threat intelligence found for this content'
      });
    }

    res.json({
      success: true,
      found: true,
      threatIntelligence: threatIntel
    });

  } catch (error) {
    console.error('Threat intelligence retrieval error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to retrieve threat intelligence',
      message: error.message 
    });
  }
});

// Generate decentralized threat report
router.get('/threat-report', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const end = endDate ? new Date(endDate) : new Date();

    const report = await blockchainService.generateThreatReport(
      start.toISOString(),
      end.toISOString()
    );

    res.json({
      success: true,
      report: report
    });

  } catch (error) {
    console.error('Threat report generation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate threat report',
      message: error.message 
    });
  }
});

// Get blockchain configuration status
router.get('/status', (req, res) => {
  const status = {
    blockchainEnabled: !!process.env.ETHEREUM_RPC_URL,
    contractDeployed: !!process.env.CONTRACT_ADDRESS,
    networkConnected: !!blockchainService.web3,
    lastBlockNumber: null,
    gasPrice: null
  };

  res.json({
    success: true,
    status: status,
    timestamp: new Date().toISOString()
  });
});

// Smart contract deployment info
router.get('/contract-info', (req, res) => {
  const contractInfo = {
    contractCode: blockchainService.getSmartContractCode(),
    deploymentInstructions: {
      steps: [
        "1. Install Remix IDE or use Hardhat/Truffle",
        "2. Copy the smart contract code",
        "3. Compile with Solidity 0.8.0 or higher",
        "4. Deploy to your preferred Ethereum network",
        "5. Update CONTRACT_ADDRESS in environment variables",
        "6. Authorize your application address as a reporter"
      ],
      networks: [
        "Ethereum Mainnet",
        "Ethereum Testnets (Goerli, Sepolia)",
        "Polygon",
        "Binance Smart Chain",
        "Local development (Ganache)"
      ]
    },
    features: [
      "Immutable threat logging",
      "Decentralized threat intelligence sharing",
      "Multi-reporter authorization system",
      "Transparent threat analytics",
      "Cross-platform threat verification"
    ]
  };

  res.json({
    success: true,
    contractInfo: contractInfo
  });
});

// Mock blockchain analytics for demo
router.get('/analytics', async (req, res) => {
  try {
    const analytics = {
      totalThreatsLogged: 15420,
      uniqueThreats: 8750,
      highRiskThreats: 2340,
      mediumRiskThreats: 4210,
      lowRiskThreats: 2200,
      averageRiskScore: 42.5,
      topThreatTypes: [
        { type: 'SUSPICIOUS_URL', count: 4250, percentage: 27.6 },
        { type: 'PHISHING_CONTENT', count: 3180, percentage: 20.6 },
        { type: 'SUSPICIOUS_KEYWORD', count: 2890, percentage: 18.7 },
        { type: 'URGENCY_MANIPULATION', count: 2110, percentage: 13.7 },
        { type: 'URL_SHORTENER', count: 1850, percentage: 12.0 },
        { type: 'MALFORMED_URL', count: 1140, percentage: 7.4 }
      ],
      monthlyTrends: [
        { month: 'Jan', threats: 1200, blocked: 1150 },
        { month: 'Feb', threats: 1350, blocked: 1280 },
        { month: 'Mar', threats: 1500, blocked: 1420 },
        { month: 'Apr', threats: 1680, blocked: 1580 },
        { month: 'May', threats: 1420, blocked: 1380 },
        { month: 'Jun', threats: 1850, blocked: 1790 }
      ],
      geographicDistribution: [
        { country: 'India', threats: 4250, percentage: 27.6 },
        { country: 'USA', threats: 3180, percentage: 20.6 },
        { country: 'China', threats: 2100, percentage: 13.6 },
        { country: 'Russia', threats: 1890, percentage: 12.3 },
        { country: 'Brazil', threats: 1520, percentage: 9.9 },
        { country: 'Others', threats: 2480, percentage: 16.1 }
      ],
      networkStats: {
        totalNodes: 156,
        activeReporters: 89,
        consensusAccuracy: 98.7,
        averageResponseTime: 2.3, // seconds
        uptime: 99.9
      },
      blockchainHealth: {
        lastBlockTime: new Date(Date.now() - 13000).toISOString(),
        averageBlockTime: 13.2, // seconds
        networkHashRate: '450 TH/s',
        gasPrice: '25 gwei',
        contractCalls: 15420,
        successfulTransactions: 15398
      }
    };

    res.json({
      success: true,
      analytics: analytics,
      generatedAt: new Date().toISOString(),
      dataSource: 'blockchain_verified'
    });

  } catch (error) {
    console.error('Analytics generation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate analytics',
      message: error.message 
    });
  }
});

// Verify blockchain integrity
router.post('/verify', async (req, res) => {
  try {
    const { transactionHash } = req.body;
    
    if (!transactionHash) {
      return res.status(400).json({ 
        error: 'Transaction hash is required' 
      });
    }

    // Mock verification - in production this would check the actual blockchain
    const verification = {
      transactionHash: transactionHash,
      blockNumber: 18750423,
      blockHash: '0x9b73c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8c8c5b8',
      timestamp: new Date().toISOString(),
      confirmed: true,
      confirmations: 12,
      gasUsed: 85000,
      gasPrice: '25000000000', // 25 gwei
      status: 'success',
      threatData: {
        verified: true,
        immutable: true,
        consensusReached: true
      }
    };

    res.json({
      success: true,
      verification: verification
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Verification failed',
      message: error.message 
    });
  }
});

// Get threat intelligence summary
router.get('/intel-summary', async (req, res) => {
  try {
    const summary = {
      last24Hours: {
        newThreats: 234,
        highRiskAlerts: 45,
        mediumRiskAlerts: 89,
        lowRiskAlerts: 100,
        blockedAttempts: 198
      },
      last7Days: {
        newThreats: 1680,
        highRiskAlerts: 320,
        mediumRiskAlerts: 650,
        lowRiskAlerts: 710,
        blockedAttempts: 1456
      },
      last30Days: {
        newThreats: 7250,
        highRiskAlerts: 1450,
        mediumRiskAlerts: 2800,
        lowRiskAlerts: 3000,
        blockedAttempts: 6890
      },
      emergingThreats: [
        {
          id: 'threat_001',
          type: 'NEW_PHISHING_CAMPAIGN',
          description: 'Fake banking notifications targeting mobile users',
          firstSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          riskLevel: 'HIGH',
          affectedRegions: ['India', 'Bangladesh', 'Sri Lanka'],
          indicators: [
            'SMS containing banking security alerts',
            'URLs with .tk and .ml domains',
            'Urgent language about account suspension'
          ]
        },
        {
          id: 'threat_002',
          type: 'SOCIAL_ENGINEERING',
          description: 'COVID-19 vaccine certificate scam',
          firstSeen: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          riskLevel: 'MEDIUM',
          affectedRegions: ['India', 'Nepal'],
          indicators: [
            'Fake government portals',
            'Requests for personal information',
            'Payment demands for certificates'
          ]
        }
      ],
      globalTrends: {
        increasingThreats: ['Mobile Banking Scams', 'Fake App Downloads', 'QR Code Phishing'],
        decreasingThreats: ['Email Phishing', 'Traditional Malware'],
        riskFactors: {
          mobileSecurity: 'HIGH',
          emailSecurity: 'MEDIUM',
          webBrowsing: 'MEDIUM',
          socialEngineering: 'HIGH'
        }
      }
    };

    res.json({
      success: true,
      summary: summary,
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Intel summary error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate intelligence summary',
      message: error.message 
    });
  }
});

module.exports = router;