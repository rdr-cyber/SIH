const express = require('express');
const router = express.Router();

// Simple chatbot routes for demo
router.get('/tips', (req, res) => {
  const { language = 'en', category } = req.query;
  
  const tips = {
    en: {
      phishing: [
        "Always verify sender identity before clicking email links",
        "Look for spelling and grammar mistakes in suspicious emails",
        "Check if the email address matches the claimed organization",
        "Be wary of urgent language demanding immediate action"
      ],
      password: [
        "Use unique passwords for each account",
        "Enable two-factor authentication whenever possible",
        "Consider using a reputable password manager",
        "Make passwords at least 12 characters long"
      ],
      general: [
        "Keep your software and operating system updated",
        "Be cautious when connecting to public Wi-Fi",
        "Regularly backup your important data",
        "Be skeptical of too-good-to-be-true offers"
      ]
    },
    hi: {
      phishing: [
        "ईमेल लिंक पर क्लिक करने से पहले हमेशा भेजने वाले की पहचान सत्यापित करें",
        "संदिग्ध ईमेल में वर्तनी और व्याकरण की गलतियों को देखें",
        "जांच लें कि ईमेल पता दावा किए गए संगठन से मेल खाता है या नहीं"
      ],
      password: [
        "हर खाते के लिए अलग पासवर्ड का उपयोग करें",
        "जब भी संभव हो दो-कारक प्रमाणीकरण सक्षम करें",
        "एक प्रतिष्ठित पासवर्ड मैनेजर का उपयोग करने पर विचार करें"
      ],
      general: [
        "अपने सॉफ़्टवेयर और ऑपरेटिंग सिस्टम को अपडेट रखें",
        "सार्वजनिक Wi-Fi से कनेक्ट करते समय सावधान रहें",
        "नियमित रूप से अपने महत्वपूर्ण डेटा का बैकअप लें"
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

router.post('/chat', (req, res) => {
  const { message, language = 'en' } = req.body;
  
  const responses = {
    en: "🤖 Hello! I'm your AI Security Mentor. Thanks for your message: '" + message + "'. I'm here to help you stay safe online!",
    hi: "🤖 नमस्ते! मैं आपका AI सुरक्षा गुरु हूं। आपके संदेश के लिए धन्यवाद: '" + message + "'। मैं आपको ऑनलाइन सुरक्षित रहने में मदद करने के लिए यहां हूं!"
  };
  
  res.json({
    success: true,
    response: {
      message: responses[language] || responses.en,
      type: 'info',
      language: language,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;