const PhishingDetector = require('./phishingDetector');
const { logThreatToBlockchain } = require('./blockchainService');
const multilingualService = require('./multilingualService');

class DetectionService {
  constructor() {
    this.phishingDetector = new PhishingDetector();
  }

  async analyzeContent(data) {
    try {
      const { content, type, language = 'en', userId } = data;
      
      let analysis;
      
      switch (type) {
        case 'text':
        case 'sms':
        case 'email':
        case 'whatsapp':
          analysis = await this.phishingDetector.analyzeText(content, language);
          break;
          
        case 'url':
          analysis = await this.analyzeUrl(content, language);
          break;
          
        case 'image':
          analysis = await this.analyzeImage(content, language);
          break;
          
        default:
          throw new Error('Unsupported content type');
      }

      // Add metadata
      analysis.timestamp = new Date().toISOString();
      analysis.contentType = type;
      analysis.scanId = this.generateScanId();

      // Localize the analysis result
      analysis = multilingualService.localizeAnalysisResult(analysis, language);

      // Log high-risk threats to blockchain
      if (analysis.riskLevel === 'HIGH') {
        try {
          await logThreatToBlockchain({
            scanId: analysis.scanId,
            content: this.hashContent(content),
            riskScore: analysis.riskScore,
            threats: analysis.threats,
            timestamp: analysis.timestamp
          });
        } catch (blockchainError) {
          console.error('Blockchain logging failed:', blockchainError);
          // Continue without blockchain logging
        }
      }

      return analysis;
      
    } catch (error) {
      console.error('Detection analysis failed:', error);
      throw new Error('Analysis failed: ' + error.message);
    }
  }

  async analyzeUrl(url, language = 'en') {
    const analysis = {
      url: url,
      language: language,
      riskScore: 0,
      riskLevel: 'LOW',
      threats: [],
      explanation: '',
      recommendations: []
    };

    try {
      // Use text analysis for URL
      const textAnalysis = await this.phishingDetector.analyzeText(url, language);
      
      // Merge results
      analysis.riskScore = textAnalysis.riskScore;
      analysis.threats = textAnalysis.threats;
      
      // Additional URL-specific checks
      const urlSpecificThreats = await this.performUrlSpecificChecks(url);
      analysis.threats.push(...urlSpecificThreats);
      analysis.riskScore += urlSpecificThreats.length * 20;

      // Update risk level
      if (analysis.riskScore >= 70) {
        analysis.riskLevel = 'HIGH';
      } else if (analysis.riskScore >= 40) {
        analysis.riskLevel = 'MEDIUM';
      }

      analysis.explanation = this.generateUrlExplanation(analysis, language);
      analysis.recommendations = this.generateUrlRecommendations(analysis, language);

      return analysis;
      
    } catch (error) {
      throw new Error('URL analysis failed: ' + error.message);
    }
  }

  async performUrlSpecificChecks(url) {
    const threats = [];
    
    try {
      const urlObj = new URL(url);
      
      // Check for HTTPS
      if (urlObj.protocol !== 'https:') {
        threats.push({
          type: 'INSECURE_PROTOCOL',
          confidence: 0.6,
          description: 'URL uses insecure HTTP protocol instead of HTTPS'
        });
      }

      // Check for suspicious TLD
      const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.top', '.click'];
      if (suspiciousTlds.some(tld => urlObj.hostname.endsWith(tld))) {
        threats.push({
          type: 'SUSPICIOUS_TLD',
          confidence: 0.7,
          description: 'Domain uses suspicious top-level domain'
        });
      }

      // Check for IP address instead of domain
      const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
      if (ipRegex.test(urlObj.hostname)) {
        threats.push({
          type: 'IP_BASED_URL',
          confidence: 0.8,
          description: 'URL uses IP address instead of domain name'
        });
      }

      // Check for excessive subdomains
      const subdomainCount = urlObj.hostname.split('.').length - 2;
      if (subdomainCount > 3) {
        threats.push({
          type: 'EXCESSIVE_SUBDOMAINS',
          confidence: 0.6,
          description: 'URL has unusual number of subdomains'
        });
      }

    } catch (error) {
      threats.push({
        type: 'MALFORMED_URL',
        confidence: 0.9,
        description: 'URL is malformed or invalid'
      });
    }

    return threats;
  }

  async analyzeImage(imageData, language = 'en') {
    // Placeholder for OCR-based image analysis
    // This would extract text from images and analyze it
    const analysis = {
      imageData: 'processed',
      language: language,
      riskScore: 0,
      riskLevel: 'LOW',
      threats: [],
      explanation: 'Image analysis is under development',
      recommendations: ['Be cautious with images containing text or QR codes']
    };

    return analysis;
  }

  generateUrlExplanation(analysis, language) {
    const explanations = {
      en: {
        HIGH: "🚨 DANGEROUS URL: This link shows strong indicators of being malicious. Do not visit this website.",
        MEDIUM: "⚠️ SUSPICIOUS URL: This link has some concerning elements. Proceed with extreme caution.",
        LOW: "✅ URL APPEARS SAFE: This link seems legitimate, but always verify before entering personal information."
      },
      hi: {
        HIGH: "🚨 खतरनाक URL: यह लिंक दुर्भावनापूर्ण होने के मजबूत संकेत दिखाता है। इस वेबसाइट पर न जाएं।",
        MEDIUM: "⚠️ संदिग्ध URL: इस लिंक में कुछ चिंताजनक तत्व हैं। अत्यधिक सावधानी के साथ आगे बढ़ें।",
        LOW: "✅ URL सुरक्षित लगता है: यह लिंक वैध लगता है, लेकिन व्यक्तिगत जानकारी दर्ज करने से पहले हमेशा सत्यापित करें।"
      }
    };

    return explanations[language]?.[analysis.riskLevel] || explanations.en[analysis.riskLevel];
  }

  generateUrlRecommendations(analysis, language) {
    const recommendations = {
      en: {
        HIGH: [
          "Do not visit this website",
          "Do not download anything from this link",
          "Report this URL to security authorities",
          "Warn others who might have received this link"
        ],
        MEDIUM: [
          "Verify the website's authenticity before visiting",
          "Do not enter personal information",
          "Check the URL carefully for typos",
          "Use official website instead if this claims to be from a known service"
        ],
        LOW: [
          "Always check URLs before clicking",
          "Look for HTTPS security indicator",
          "Be cautious about downloading files"
        ]
      }
    };

    return recommendations[language]?.[analysis.riskLevel] || recommendations.en[analysis.riskLevel];
  }

  generateScanId() {
    return 'scan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  hashContent(content) {
    // Simple hash for privacy - in production, use proper hashing
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  // Real-time scanning for browser extension
  async scanPageContent(pageData) {
    const { url, title, forms, links, text } = pageData;
    
    const analysis = {
      url: url,
      pageTitle: title,
      riskScore: 0,
      riskLevel: 'LOW',
      threats: [],
      pageElements: {
        suspiciousForms: [],
        suspiciousLinks: [],
        suspiciousText: []
      }
    };

    // Analyze page URL
    const urlAnalysis = await this.analyzeUrl(url);
    analysis.riskScore += urlAnalysis.riskScore * 0.5;
    analysis.threats.push(...urlAnalysis.threats);

    // Analyze forms for credential harvesting
    if (forms && forms.length > 0) {
      forms.forEach((form, index) => {
        if (this.isCredentialHarvestingForm(form)) {
          analysis.pageElements.suspiciousForms.push({
            formIndex: index,
            action: form.action,
            reason: 'Potential credential harvesting form'
          });
          analysis.riskScore += 25;
        }
      });
    }

    // Analyze links
    if (links && links.length > 0) {
      for (const link of links.slice(0, 10)) { // Limit to first 10 links
        const linkAnalysis = await this.analyzeUrl(link);
        if (linkAnalysis.riskLevel !== 'LOW') {
          analysis.pageElements.suspiciousLinks.push({
            url: link,
            riskLevel: linkAnalysis.riskLevel,
            threats: linkAnalysis.threats
          });
          analysis.riskScore += 15;
        }
      }
    }

    // Analyze page text
    if (text) {
      const textAnalysis = await this.phishingDetector.analyzeText(text);
      if (textAnalysis.riskLevel !== 'LOW') {
        analysis.pageElements.suspiciousText = textAnalysis.threats;
        analysis.riskScore += textAnalysis.riskScore * 0.3;
      }
    }

    // Determine final risk level
    if (analysis.riskScore >= 70) {
      analysis.riskLevel = 'HIGH';
    } else if (analysis.riskScore >= 40) {
      analysis.riskLevel = 'MEDIUM';
    }

    return analysis;
  }

  isCredentialHarvestingForm(form) {
    const inputs = form.inputs || [];
    const hasPasswordField = inputs.some(input => 
      input.type === 'password' || 
      input.name.toLowerCase().includes('password') ||
      input.name.toLowerCase().includes('pass')
    );
    
    const hasUsernameField = inputs.some(input =>
      input.type === 'email' ||
      input.name.toLowerCase().includes('email') ||
      input.name.toLowerCase().includes('username') ||
      input.name.toLowerCase().includes('user')
    );

    return hasPasswordField && hasUsernameField;
  }
}

module.exports = new DetectionService();