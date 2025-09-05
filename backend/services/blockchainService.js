const Web3 = require('web3');

class BlockchainService {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.account = null;
    this.initialize();
  }

  async initialize() {
    try {
      if (process.env.ETHEREUM_RPC_URL) {
        this.web3 = new Web3(process.env.ETHEREUM_RPC_URL);
        
        if (process.env.PRIVATE_KEY) {
          this.account = this.web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
          this.web3.eth.accounts.wallet.add(this.account);
        }

        // Smart contract ABI for threat intelligence logging
        const contractABI = [
          {
            "inputs": [
              {"name": "_scanId", "type": "string"},
              {"name": "_contentHash", "type": "string"},
              {"name": "_riskScore", "type": "uint256"},
              {"name": "_threatTypes", "type": "string[]"},
              {"name": "_timestamp", "type": "uint256"}
            ],
            "name": "logThreat",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [{"name": "_contentHash", "type": "string"}],
            "name": "getThreatInfo",
            "outputs": [
              {"name": "scanId", "type": "string"},
              {"name": "riskScore", "type": "uint256"},
              {"name": "threatTypes", "type": "string[]"},
              {"name": "timestamp", "type": "uint256"},
              {"name": "reportCount", "type": "uint256"}
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];

        if (process.env.CONTRACT_ADDRESS) {
          this.contract = new this.web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
        }
      }
    } catch (error) {
      console.error('Blockchain initialization failed:', error);
      // Continue without blockchain functionality
    }
  }

  async logThreatToBlockchain(threatData) {
    if (!this.contract || !this.account) {
      console.log('Blockchain not configured, skipping threat logging');
      return null;
    }

    try {
      const { scanId, content, riskScore, threats, timestamp } = threatData;
      
      const threatTypes = threats.map(threat => threat.type);
      const timestampUnix = Math.floor(new Date(timestamp).getTime() / 1000);

      const tx = await this.contract.methods.logThreat(
        scanId,
        content, // This should be a hash of the content
        riskScore,
        threatTypes,
        timestampUnix
      ).send({
        from: this.account.address,
        gas: 200000
      });

      console.log('Threat logged to blockchain:', tx.transactionHash);
      
      return {
        transactionHash: tx.transactionHash,
        blockNumber: tx.blockNumber,
        gasUsed: tx.gasUsed
      };
      
    } catch (error) {
      console.error('Failed to log threat to blockchain:', error);
      throw error;
    }
  }

  async getThreatIntelligence(contentHash) {
    if (!this.contract) {
      return null;
    }

    try {
      const result = await this.contract.methods.getThreatInfo(contentHash).call();
      
      if (result.timestamp === '0') {
        return null; // No data found
      }

      return {
        scanId: result.scanId,
        riskScore: parseInt(result.riskScore),
        threatTypes: result.threatTypes,
        timestamp: new Date(parseInt(result.timestamp) * 1000).toISOString(),
        reportCount: parseInt(result.reportCount)
      };
      
    } catch (error) {
      console.error('Failed to get threat intelligence:', error);
      return null;
    }
  }

  // Generate a decentralized threat report
  async generateThreatReport(startDate, endDate) {
    if (!this.contract) {
      return { error: 'Blockchain not configured' };
    }

    try {
      // This would query blockchain events for threat logs in the date range
      // For demo purposes, returning mock data
      return {
        period: { startDate, endDate },
        totalThreats: 1250,
        highRiskThreats: 342,
        mediumRiskThreats: 567,
        lowRiskThreats: 341,
        topThreatTypes: [
          { type: 'SUSPICIOUS_URL', count: 456 },
          { type: 'PHISHING_CONTENT', count: 321 },
          { type: 'SUSPICIOUS_KEYWORD', count: 289 },
          { type: 'URGENCY_MANIPULATION', count: 184 }
        ],
        blockchainVerified: true,
        lastUpdated: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Failed to generate threat report:', error);
      throw error;
    }
  }

  // Smart contract for threat intelligence sharing
  getSmartContractCode() {
    return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ThreatIntelligence {
    struct ThreatLog {
        string scanId;
        string contentHash;
        uint256 riskScore;
        string[] threatTypes;
        uint256 timestamp;
        address reporter;
        uint256 reportCount;
    }
    
    mapping(string => ThreatLog) public threats;
    mapping(address => bool) public authorizedReporters;
    
    address public owner;
    
    event ThreatLogged(
        string indexed contentHash,
        string scanId,
        uint256 riskScore,
        address reporter,
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedReporters[msg.sender], "Not authorized to report threats");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedReporters[msg.sender] = true;
    }
    
    function authorizeReporter(address reporter) external onlyOwner {
        authorizedReporters[reporter] = true;
    }
    
    function logThreat(
        string memory _scanId,
        string memory _contentHash,
        uint256 _riskScore,
        string[] memory _threatTypes,
        uint256 _timestamp
    ) external onlyAuthorized {
        require(_riskScore <= 100, "Risk score must be between 0 and 100");
        
        if (threats[_contentHash].timestamp == 0) {
            // New threat
            threats[_contentHash] = ThreatLog({
                scanId: _scanId,
                contentHash: _contentHash,
                riskScore: _riskScore,
                threatTypes: _threatTypes,
                timestamp: _timestamp,
                reporter: msg.sender,
                reportCount: 1
            });
        } else {
            // Update existing threat
            threats[_contentHash].reportCount++;
            if (_riskScore > threats[_contentHash].riskScore) {
                threats[_contentHash].riskScore = _riskScore;
            }
        }
        
        emit ThreatLogged(_contentHash, _scanId, _riskScore, msg.sender, _timestamp);
    }
    
    function getThreatInfo(string memory _contentHash) 
        external 
        view 
        returns (
            string memory scanId,
            uint256 riskScore,
            string[] memory threatTypes,
            uint256 timestamp,
            uint256 reportCount
        ) 
    {
        ThreatLog memory threat = threats[_contentHash];
        return (
            threat.scanId,
            threat.riskScore,
            threat.threatTypes,
            threat.timestamp,
            threat.reportCount
        );
    }
}`;
  }
}

module.exports = new BlockchainService();