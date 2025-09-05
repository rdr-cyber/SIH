const natural = require('natural');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { URL } = require('url');

class PhishingDetector {
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.initializeClassifier();
    
    // Suspicious keywords in multiple languages
    this.suspiciousKeywords = {
      en: [
        'urgent', 'verify', 'suspend', 'click here', 'limited time', 'act now',
        'congratulations', 'winner', 'lottery', 'prize', 'free money',
        'bank account', 'security alert', 'confirm identity', 'update payment',
        'suspended account', 'immediate action', 'click link'
      ],
      hi: [
        'तुरंत', 'सत्यापित', 'निलंबित', 'यहाँ क्लिक करें', 'सीमित समय',
        'बधाई', 'विजेता', 'लॉटरी', 'पुरस्कार', 'मुफ्त पैसा',
        'बैंक खाता', 'सुरक्षा चेतावनी', 'पहचान की पुष्टि'
      ],
      bn: [
        'জরুরি', 'যাচাই', 'স্থগিত', 'এখানে ক্লিক করুন', 'সীমিত সময়',
        'অভিনন্দন', 'বিজয়ী', 'লটারি', 'পুরস্কার', 'বিনামূল্যে টাকা'
      ],
      ta: [
        'அவசரம்', 'சரிபார்', 'இங்கே கிளிக் செய்யவும்', 'வரையறுக்கப்பட்ட நேரம்',
        'வாழ்த்துகள்', 'வெற்றியாளர்', 'லாட்டரி', 'பரிசு'
      ]
    };

    // Suspicious domains patterns
    this.suspiciousDomains = [
      /paypal[\-\.].*\.com/i,
      /amazon[\-\.].*\.com/i,
      /google[\-\.].*\.com/i,
      /microsoft[\-\.].*\.com/i,
      /apple[\-\.].*\.com/i,
      /facebook[\-\.].*\.com/i,
      /instagram[\-\.].*\.com/i,
      /whatsapp[\-\.].*\.com/i,
      /bank[\-\.].*\.com/i,
      /secure[\-\.].*\.com/i
    ];
  }

  initializeClassifier() {
    // Training data for phishing detection
    const trainingData = [
      // Legitimate messages
      { text: "Welcome to our service! Your account has been created successfully.", label: 'legitimate' },
      { text: "Thank you for your purchase. Your order will be delivered soon.", label: 'legitimate' },
      { text: "Your monthly statement is ready for review in your account.", label: 'legitimate' },
      { text: "Meeting scheduled for tomorrow at 2 PM in conference room.", label: 'legitimate' },
      
      // Phishing messages
      { text: "URGENT: Your account will be suspended! Click here to verify immediately.", label: 'phishing' },
      { text: "Congratulations! You've won $10,000! Click link to claim prize now.", label: 'phishing' },
      { text: "Security Alert: Suspicious activity detected. Confirm identity here.", label: 'phishing' },
      { text: "Your PayPal account is limited. Update payment information immediately.", label: 'phishing' },
      { text: "Bank security notice: Verify your account or it will be closed.", label: 'phishing' },
      { text: "You have received a money transfer. Click to accept payment.", label: 'phishing' }
    ];

    // Train the classifier
    trainingData.forEach(item => {
      this.classifier.addDocument(item.text, item.label);
    });
    
    this.classifier.train();
  }

  async analyzeText(text, language = 'en') {
    const analysis = {
      text: text,
      language: language,
      riskScore: 0,
      riskLevel: 'LOW',
      threats: [],
      explanation: '',
      recommendations: []
    };

    // 1. Bayesian classification
    const classification = this.classifier.classify(text);
    const classificationScore = this.classifier.getClassifications(text);
    
    if (classification === 'phishing') {
      analysis.riskScore += 40;
      analysis.threats.push({
        type: 'SUSPICIOUS_CONTENT',
        confidence: classificationScore[0].value,
        description: 'Content matches known phishing patterns'
      });
    }

    // 2. Keyword analysis
    const keywordThreats = this.analyzeKeywords(text, language);
    if (keywordThreats.length > 0) {
      analysis.riskScore += keywordThreats.length * 15;
      analysis.threats.push(...keywordThreats);
    }

    // 3. URL analysis
    const urlThreats = await this.analyzeUrls(text);
    if (urlThreats.length > 0) {
      analysis.riskScore += urlThreats.length * 25;
      analysis.threats.push(...urlThreats);
    }

    // 4. Urgency detection
    const urgencyThreat = this.detectUrgency(text, language);
    if (urgencyThreat) {
      analysis.riskScore += 20;
      analysis.threats.push(urgencyThreat);
    }

    // Determine risk level
    if (analysis.riskScore >= 70) {
      analysis.riskLevel = 'HIGH';
    } else if (analysis.riskScore >= 40) {
      analysis.riskLevel = 'MEDIUM';
    } else {
      analysis.riskLevel = 'LOW';
    }

    // Generate explanation and recommendations
    analysis.explanation = this.generateExplanation(analysis, language);
    analysis.recommendations = this.generateRecommendations(analysis, language);

    return analysis;
  }

  analyzeKeywords(text, language) {
    const threats = [];
    const keywords = this.suspiciousKeywords[language] || this.suspiciousKeywords.en;
    
    keywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        threats.push({
          type: 'SUSPICIOUS_KEYWORD',
          keyword: keyword,
          confidence: 0.8,
          description: `Contains suspicious keyword: "${keyword}"`
        });
      }
    });

    return threats;
  }

  async analyzeUrls(text) {
    const threats = [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];

    for (const url of urls) {
      try {
        const urlObj = new URL(url);
        
        // Check against suspicious domain patterns
        for (const pattern of this.suspiciousDomains) {
          if (pattern.test(urlObj.hostname)) {
            threats.push({
              type: 'SUSPICIOUS_URL',
              url: url,
              domain: urlObj.hostname,
              confidence: 0.9,
              description: `Suspicious domain pattern detected: ${urlObj.hostname}`
            });
            break;
          }
        }

        // Check for URL shorteners
        const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'short.link', 'ow.ly'];
        if (shorteners.some(shortener => urlObj.hostname.includes(shortener))) {
          threats.push({
            type: 'URL_SHORTENER',
            url: url,
            confidence: 0.6,
            description: 'URL shortener detected - destination unknown'
          });
        }

        // Check for suspicious parameters
        if (urlObj.search.includes('login') || urlObj.search.includes('verify') || urlObj.search.includes('confirm')) {
          threats.push({
            type: 'SUSPICIOUS_PARAMETERS',
            url: url,
            confidence: 0.7,
            description: 'URL contains suspicious parameters related to authentication'
          });
        }

      } catch (error) {
        threats.push({
          type: 'MALFORMED_URL',
          url: url,
          confidence: 0.8,
          description: 'Malformed or suspicious URL structure'
        });
      }
    }

    return threats;
  }

  detectUrgency(text, language) {
    const urgencyPatterns = {
      en: /\b(urgent|immediately|act now|limited time|expires|deadline|asap|hurry)\b/i,
      hi: /\b(तुरंत|जल्दी|अभी|सीमित समय|समाप्त|अंतिम तिथि)\b/i,
      bn: /\b(জরুরি|তাড়াতাড়ি|এখনই|সীমিত সময়|শেষ|চূড়ান্ত তারিখ)\b/i,
      ta: /\b(அவசரம்|உடனடியாக|இப்போது|வரையறுக்கப்பட்ட நேரம்|முடிவு)\b/i
    };

    const pattern = urgencyPatterns[language] || urgencyPatterns.en;
    
    if (pattern.test(text)) {
      return {
        type: 'URGENCY_MANIPULATION',
        confidence: 0.7,
        description: 'Message uses urgency tactics to pressure quick action'
      };
    }

    return null;
  }

  generateExplanation(analysis, language) {
    const explanations = {
      en: {
        HIGH: "⚠️ HIGH RISK: This message shows multiple signs of being a phishing attempt or scam. Do not click any links or provide personal information.",
        MEDIUM: "⚡ MEDIUM RISK: This message contains some suspicious elements. Be cautious and verify the sender before taking any action.",
        LOW: "✅ LOW RISK: This message appears to be legitimate, but always remain vigilant online."
      },
      hi: {
        HIGH: "⚠️ उच्च जोखिम: यह संदेश फिशिंग या धोखाधड़ी का प्रयास हो सकता है। कोई भी लिंक न दबाएं या व्यक्तिगत जानकारी न दें।",
        MEDIUM: "⚡ मध्यम जोखिम: इस संदेश में कुछ संदिग्ध तत्व हैं। सावधान रहें और कोई भी कार्य करने से पहले भेजने वाले की पुष्टि करें।",
        LOW: "✅ कम जोखिम: यह संदेश वैध लगता है, लेकिन हमेशा ऑनलाइन सतर्क रहें।"
      }
    };

    return explanations[language]?.[analysis.riskLevel] || explanations.en[analysis.riskLevel];
  }

  generateRecommendations(analysis, language) {
    const recommendations = {
      en: {
        HIGH: [
          "Do not click any links in this message",
          "Do not provide personal or financial information",
          "Report this message to relevant authorities",
          "Delete the message immediately",
          "If it claims to be from a bank/service, contact them directly using official channels"
        ],
        MEDIUM: [
          "Verify the sender's identity through official channels",
          "Check URLs carefully before clicking",
          "Be cautious about providing personal information",
          "When in doubt, ask someone you trust"
        ],
        LOW: [
          "Stay vigilant for future messages",
          "Keep your security software updated",
          "Never share passwords or OTPs with anyone"
        ]
      },
      hi: [
        "इस संदेश में किसी भी लिंक पर क्लिक न करें",
        "व्यक्तिगत या वित्तीय जानकारी प्रदान न करें",
        "इस संदेश को संबंधित अधिकारियों को रिपोर्ट करें",
        "संदेश को तुरंत हटा दें"
      ]
    };

    return recommendations[language]?.[analysis.riskLevel] || recommendations.en[analysis.riskLevel];
  }

  // Real-time URL reputation check (placeholder for external API integration)
  async checkUrlReputation(url) {
    // This would integrate with services like VirusTotal, Google Safe Browsing, etc.
    // For demo purposes, returning a mock response
    return {
      safe: true,
      reputation: 'UNKNOWN',
      lastScanned: new Date().toISOString()
    };
  }
}

module.exports = PhishingDetector;