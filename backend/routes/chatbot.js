const express = require('express');
const express = require('express');
const router = express.Router();
const multilingualService = require('../services/multilingualService');

// Chatbot conversation endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, language = 'en', conversationId } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Detect language if not specified
    const detectedLanguage = language || multilingualService.detectLanguage(message);
    
    // Generate AI response based on message content
    const response = generateChatbotResponse(message.toLowerCase(), detectedLanguage);

    res.json({
      success: true,
      response: {
        message: response.content,
        type: response.type,
        language: detectedLanguage,
        conversationId: conversationId || 'conv_' + Date.now(),
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions || []
      }
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Chatbot service unavailable',
      message: error.message 
    });
  }
});

// Security tips endpoint
router.get('/tips', (req, res) => {
  const { language = 'en', category } = req.query;
  
  const tips = {
    en: {
      phishing: [
        "Always verify sender identity before clicking email links",
        "Look for spelling and grammar mistakes in suspicious emails",
        "Check if the email address matches the claimed organization",
        "Be wary of urgent language demanding immediate action",
        "Hover over links to see the actual destination before clicking"
      ],
      password: [
        "Use unique passwords for each account",
        "Enable two-factor authentication whenever possible",
        "Consider using a reputable password manager",
        "Make passwords at least 12 characters long",
        "Mix uppercase, lowercase, numbers, and symbols"
      ],
      general: [
        "Keep your software and operating system updated",
        "Be cautious when connecting to public Wi-Fi",
        "Regularly backup your important data",
        "Be skeptical of too-good-to-be-true offers",
        "Monitor your financial accounts regularly"
      ]
    },
    hi: {
      phishing: [
        "ईमेल लिंक पर क्लिक करने से पहले हमेशा भेजने वाले की पहचान सत्यापित करें",
        "संदिग्ध ईमेल में वर्तनी और व्याकरण की गलतियों को देखें",
        "जांच लें कि ईमेल पता दावा किए गए संगठन से मेल खाता है या नहीं",
        "तत्काल कार्रवाई की मांग करने वाली भाषा से सावधान रहें"
      ],
      password: [
        "हर खाते के लिए अलग पासवर्ड का उपयोग करें",
        "जब भी संभव हो दो-कारक प्रमाणीकरण सक्षम करें",
        "एक प्रतिष्ठित पासवर्ड मैनेजर का उपयोग करने पर विचार करें",
        "पासवर्ड कम से कम 12 वर्ण लंबा बनाएं"
      ]
    }
  };

  const categoryTips = tips[language] || tips.en;
  const selectedTips = category ? categoryTips[category] : categoryTips.general;

  res.json({
    success: true,
    tips: selectedTips || categoryTips.general,
    category: category || 'general',
    language: language
  });
});

// Analyze user content for security threats
router.post('/analyze-content', async (req, res) => {
  try {
    const { content, language = 'en' } = req.body;
    
    if (!content) {
      return res.status(400).json({ 
        error: 'Content is required for analysis' 
      });
    }

    // This would integrate with the detection service
    // For now, providing a mock analysis
    const analysis = performSecurityAnalysis(content, language);

    res.json({
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error('Content analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Analysis failed',
      message: error.message 
    });
  }
});

// Get conversation history
router.get('/history/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  
  // Mock conversation history - in production this would come from database
  const history = {
    conversationId: conversationId,
    messages: [
      {
        id: '1',
        content: 'Hello! How can I help you with cybersecurity today?',
        sender: 'bot',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'greeting'
      }
    ],
    createdAt: new Date(Date.now() - 300000).toISOString(),
    lastActivity: new Date().toISOString()
  };

  res.json({
    success: true,
    history: history
  });
});

function generateChatbotResponse(message, language) {
  const responses = {
    en: {
      greeting: {
        content: "🤖 Hello! I'm your AI Security Mentor. I'm here to help you stay safe online. You can ask me about phishing, password security, safe browsing, or any cybersecurity topic!",
        type: 'greeting',
        suggestions: ['Tell me about phishing', 'How to create strong passwords', 'Safe browsing tips']
      },
      phishing: {
        content: "🎣 Phishing is a cyber attack where attackers impersonate legitimate organizations to steal your personal information. Here are key signs to watch for:\n\n• Urgent language demanding immediate action\n• Suspicious sender email addresses\n• Generic greetings like 'Dear Customer'\n• Links that don't match the claimed destination\n• Requests for sensitive information via email\n\nAlways verify independently before taking action!",
        type: 'warning',
        suggestions: ['How to check if an email is phishing?', 'What to do if I clicked a phishing link?']
      },
      password: {
        content: "🔐 Strong passwords are your first line of defense! Here's how to create them:\n\n• Use at least 12 characters\n• Mix uppercase, lowercase, numbers, and symbols\n• Avoid personal information\n• Use unique passwords for each account\n• Consider using a password manager\n• Enable two-factor authentication when available\n\nRemember: A strong password is like a strong lock on your digital door!",
        type: 'tip',
        suggestions: ['Password manager recommendations', 'How to enable 2FA?']
      },
      scam: {
        content: "⚠️ Common scam warning signs:\n\n• Too-good-to-be-true offers\n• Pressure to act immediately\n• Requests for upfront payments\n• Poor grammar and spelling\n• Unsolicited contact\n• Requests for personal/financial information\n\nWhen in doubt, verify through official channels. Trust your instincts!",
        type: 'warning',
        suggestions: ['Types of online scams', 'How to report scams?']
      },
      browsing: {
        content: "🌐 Stay safe while browsing:\n\n• Look for HTTPS (padlock icon) on websites\n• Avoid clicking suspicious links\n• Keep your browser updated\n• Use reputable antivirus software\n• Be cautious with downloads\n• Check website URLs carefully\n• Don't trust pop-up warnings\n\nYour browser is your gateway to the internet - keep it secure!",
        type: 'tip',
        suggestions: ['Browser security settings', 'Safe download practices']
      },
      default: {
        content: "🤔 I understand you're asking about cybersecurity. Here are some topics I can help with:\n\n• Phishing identification\n• Password security\n• Safe browsing practices\n• Scam prevention\n• Threat analysis\n\nPlease ask me about any of these topics or share specific content you'd like me to analyze!",
        type: 'info',
        suggestions: ['Analyze this message for threats', 'Give me a security tip', 'Test my security knowledge']
      }
    },
    hi: {
      greeting: {
        content: "🤖 नमस्ते! मैं आपका AI सुरक्षा गुरु हूं। मैं आपको ऑनलाइन सुरक्षित रहने में मदद करने के लिए यहां हूं। आप मुझसे फिशिंग, पासवर्ड सुरक्षा, सुरक्षित ब्राउज़िंग, या किसी भी साइबर सुरक्षा विषय के बारे में पूछ सकते हैं!",
        type: 'greeting',
        suggestions: ['फिशिंग के बारे में बताएं', 'मजबूत पासवर्ड कैसे बनाएं', 'सुरक्षित ब्राउज़िंग टिप्स']
      },
      phishing: {
        content: "🎣 फिशिंग एक साइबर हमला है जहां हमलावर आपकी व्यक्तिगत जानकारी चुराने के लिए वैध संगठनों का रूप धारण करते हैं। देखने योग्य मुख्य संकेत:\n\n• तत्काल कार्रवाई की मांग करने वाली भाषा\n• संदिग्ध भेजने वाले ईमेल पते\n• 'प्रिय ग्राहक' जैसे सामान्य अभिवादन\n• लिंक जो दावा किए गए गंतव्य से मेल नहीं खाते\n• ईमेल के माध्यम से संवेदनशील जानकारी की मांग\n\nकोई भी कार्रवाई करने से पहले हमेशा स्वतंत्र रूप से सत्यापित करें!",
        type: 'warning',
        suggestions: ['ईमेल फिशिंग कैसे जांचें?', 'फिशिंग लिंक पर क्लिक करने पर क्या करें?']
      }
    }
  };

  const langResponses = responses[language] || responses.en;

  // Determine response based on message content
  if (message.includes('hello') || message.includes('hi') || message.includes('नमस्ते')) {
    return langResponses.greeting;
  } else if (message.includes('phishing') || message.includes('फिशिंग')) {
    return langResponses.phishing;
  } else if (message.includes('password') || message.includes('पासवर्ड')) {
    return langResponses.password || responses.en.password;
  } else if (message.includes('scam') || message.includes('धोखाधड़ी')) {
    return langResponses.scam || responses.en.scam;
  } else if (message.includes('browsing') || message.includes('browse') || message.includes('ब्राउज़िंग')) {
    return langResponses.browsing || responses.en.browsing;
  } else {
    return langResponses.default || responses.en.default;
  }
}

function performSecurityAnalysis(content, language) {
  // Mock security analysis - this would integrate with the actual detection service
  const riskFactors = [];
  let riskScore = 0;

  // Check for suspicious keywords
  const suspiciousKeywords = ['urgent', 'verify', 'suspend', 'click here', 'limited time', 'act now'];
  suspiciousKeywords.forEach(keyword => {
    if (content.toLowerCase().includes(keyword)) {
      riskFactors.push({
        type: 'suspicious_keyword',
        keyword: keyword,
        description: `Contains suspicious keyword: "${keyword}"`
      });
      riskScore += 15;
    }
  });

  // Check for URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = content.match(urlRegex);
  if (urls) {
    urls.forEach(url => {
      riskFactors.push({
        type: 'url_found',
        url: url,
        description: 'URL detected - verify before clicking'
      });
      riskScore += 10;
    });
  }

  // Determine risk level
  let riskLevel = 'LOW';
  if (riskScore >= 40) riskLevel = 'HIGH';
  else if (riskScore >= 20) riskLevel = 'MEDIUM';

  return {
    riskScore: riskScore,
    riskLevel: riskLevel,
    riskFactors: riskFactors,
    recommendation: getRiskRecommendation(riskLevel, language),
    analysis: {
      contentLength: content.length,
      hasUrls: urls ? urls.length : 0,
      suspiciousElements: riskFactors.length
    }
  };
}

function getRiskRecommendation(riskLevel, language) {
  const recommendations = {
    en: {
      HIGH: "⚠️ High risk detected! Do not click any links or provide personal information. Verify with the sender through official channels.",
      MEDIUM: "⚡ Medium risk detected. Be cautious and verify the sender before taking any action.",
      LOW: "✅ Low risk detected. Content appears safe, but always remain vigilant."
    },
    hi: {
      HIGH: "⚠️ उच्च जोखिम का पता चला! कोई भी लिंक पर क्लिक न करें या व्यक्तिगत जानकारी न दें। आधिकारिक चैनलों के माध्यम से भेजने वाले की पुष्टि करें।",
      MEDIUM: "⚡ मध्यम जोखिम का पता चला। सावधान रहें और कोई भी कार्रवाई करने से पहले भेजने वाले की पुष्टि करें।",
      LOW: "✅ कम जोखिम का पता चला। सामग्री सुरक्षित लगती है, लेकिन हमेशा सतर्क रहें।"
    }
  };

  return recommendations[language]?.[riskLevel] || recommendations.en[riskLevel];
}

module.exports = router;