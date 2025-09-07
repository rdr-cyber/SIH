class MultilingualService {
class MultilingualService {
  constructor() {
    this.translations = {
      // Threat explanations
      explanations: {
        en: {
          HIGH: "⚠️ HIGH RISK: This message shows multiple signs of being a phishing attempt or scam. Do not click any links or provide personal information.",
          MEDIUM: "⚡ MEDIUM RISK: This message contains some suspicious elements. Be cautious and verify the sender before taking any action.",
          LOW: "✅ LOW RISK: This message appears to be legitimate, but always remain vigilant online."
        },
        hi: {
          HIGH: "⚠️ उच्च जोखिम: यह संदेश फिशिंग या धोखाधड़ी का प्रयास हो सकता है। कोई भी लिंक न दबाएं या व्यक्तिगत जानकारी न दें।",
          MEDIUM: "⚡ मध्यम जोखिम: इस संदेश में कुछ संदिग्ध तत्व हैं। सावधान रहें और कोई भी कार्य करने से पहले भेजने वाले की पुष्टि करें।",
          LOW: "✅ कम जोखिम: यह संदेश वैध लगता है, लेकिन हमेशा ऑनलाइन सतर्क रहें।"
        },
        bn: {
          HIGH: "⚠️ উচ্চ ঝুঁকি: এই বার্তাটি ফিশিং বা প্রতারণার চেষ্টা হতে পারে। কোন লিঙ্কে ক্লিক করবেন না বা ব্যক্তিগত তথ্য দেবেন না।",
          MEDIUM: "⚡ মাঝারি ঝুঁকি: এই বার্তায় কিছু সন্দেহজনক উপাদান রয়েছে। সতর্ক থাকুন এবং কোন পদক্ষেপ নেওয়ার আগে প্রেরকের পরিচয় যাচাই করুন।",
          LOW: "✅ কম ঝুঁকি: এই বার্তাটি বৈধ বলে মনে হচ্ছে, তবে সর্বদা অনলাইনে সতর্ক থাকুন।"
        },
        ta: {
          HIGH: "⚠️ அதிக ஆபத்து: இந்த செய்தி ஃபிஷிங் அல்லது மோசடி முயற்சியாக இருக்கலாம். எந்த இணைப்பையும் அழுத்த வேண்டாம் அல்லது தனிப்பட்ட தகவல்களை வழங்க வேண்டாம்.",
          MEDIUM: "⚡ நடுத்தர ஆபத்து: இந்த செய்தியில் சில சந்தேகத்திற்குரிய கூறுகள் உள்ளன. எச்சரிக்கையாக இருங்கள் மற்றும் எந்த நடவடிக்கையும் எடுப்பதற்கு முன் அனுப்புநரைச் சரிபார்க்கவும்.",
          LOW: "✅ குறைந்த ஆபத்து: இந்த செய்தி நியாயமானதாக தெரிகிறது, ஆனால் எப்போதும் ஆன்லайனில் விழிப்புடன் இருங்கள்."
        },
        te: {
          HIGH: "⚠️ అధిక ప్రమాదం: ఈ సందేశం ఫిషింగ్ లేదా మోసపూరిత ప్రయత్నం కావచ్చు. ఎలాంటి లింక్‌లపై క్లిక్ చేయవద్దు లేదా వ్యక్తిగత సమాచారం ఇవ్వవద్దు।",
          MEDIUM: "⚡ మధ్యస్థ ప్రమాదం: ఈ సందేశంలో కొన్ని అనుమానాస్పద అంశాలు ఉన్నాయి. జాగ్రత్తగా ఉండండి మరియు ఎలాంటి చర్య తీసుకునే ముందు పంపినవారిని ధృవీకరించండి।",
          LOW: "✅ తక్కువ ప్రమాదం: ఈ సందేశం చట్టబద్ధంగా కనిపిస్తోంది, కానీ ఎల్లప్పుడూ ఆన్‌లైన్‌లో అప్రమత్తంగా ఉండండి."
        },
        mr: {
          HIGH: "⚠️ उच्च धोका: हा संदेश फिशिंग किंवा फसवणुकीचा प्रयत्न असू शकतो. कोणत्याही लिंकवर क्लिक करू नका किंवा वैयक्तिक माहिती देऊ नका.",
          MEDIUM: "⚡ मध्यम धोका: या संदेशात काही संशयास्पद घटक आहेत. सावध राहा आणि कोणतीही कृती करण्यापूर्वी पाठवणाऱ्याची पडताळणी करा.",
          LOW: "✅ कमी धोका: हा संदेश कायदेशीर दिसतो, परंतु नेहमी ऑनलाइन सावध राहा."
        },
        gu: {
          HIGH: "⚠️ ઉચ્ચ જોખમ: આ સંદેશ ફિશિંગ અથવા છેતરપિંડીનો પ્રયાસ હોઈ શકે છે. કોઈપણ લિંક પર ક્લિક કરશો નહીં અથવા વ્યક્તિગત માહિતી આપશો નહીં.",
          MEDIUM: "⚡ મધ્યમ જોખમ: આ સંદેશમાં કેટલાક શંકાસ્પદ તત્વો છે. સાવધાન રહો અને કોઈપણ પગલાં લેતા પહેલા મોકલનારની ચકાસણી કરો.",
          LOW: "✅ ઓછું જોખમ: આ સંદેશ કાયદેસર લાગે છે, પરંતુ હંમેશા ઓનલાઇન સાવધાન રહો."
        }
      },
      
      // Recommendations
      recommendations: {
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
        hi: {
          HIGH: [
            "इस संदेश में किसी भी लिंक पर क्लिक न करें",
            "व्यक्तिगत या वित्तीय जानकारी प्रदान न करें",
            "इस संदेश को संबंधित अधिकारियों को रिपोर्ट करें",
            "संदेश को तुरंत हटा दें",
            "यदि यह बैंक/सेवा से होने का दावा करता है, तो आधिकारिक चैनलों का उपयोग करके सीधे संपर्क करें"
          ],
          MEDIUM: [
            "आधिकारिक चैनलों के माध्यम से भेजने वाले की पहचान सत्यापित करें",
            "क्लिक करने से पहले URL को ध्यान से जांचें",
            "व्यक्तिगत जानकारी प्रदान करने में सावधानी बरतें",
            "संदेह होने पर किसी विश्वसनीय व्यक्ति से पूछें"
          ],
          LOW: [
            "भविष्य के संदेशों के लिए सतर्क रहें",
            "अपने सुरक्षा सॉफ़्टवेयर को अपडेट रखें",
            "कभी भी पासवर्ड या OTP किसी के साथ साझा न करें"
          ]
        },
        bn: {
          HIGH: [
            "এই বার্তার কোন লিঙ্কে ক্লিক করবেন না",
            "ব্যক্তিগত বা আর্থিক তথ্য প্রদান করবেন না",
            "এই বার্তাটি সংশ্লিষ্ট কর্তৃপক্ষের কাছে রিপোর্ট করুন",
            "বার্তাটি অবিলম্বে মুছে ফেলুন",
            "যদি এটি ব্যাংক/সেবার পক্ষ থেকে দাবি করে, তাহলে সরাসরি অফিসিয়াল চ্যানেল ব্যবহার করে যোগাযোগ করুন"
          ],
          MEDIUM: [
            "অফিসিয়াল চ্যানেলের মাধ্যমে প্রেরকের পরিচয় যাচাই করুন",
            "ক্লিক করার আগে URL সাবধানে পরীক্ষা করুন",
            "ব্যক্তিগত তথ্য প্রদানে সতর্ক থাকুন",
            "সন্দেহ হলে বিশ্বস্ত কারো কাছে জিজ্ঞাসা করুন"
          ],
          LOW: [
            "ভবিষ্যতের বার্তার জন্য সতর্ক থাকুন",
            "আপনার নিরাপত্তা সফটওয়্যার আপডেট রাখুন",
            "কখনো পাসওয়ার্ড বা OTP কারো সাথে শেয়ার করবেন না"
          ]
        }
      },

      // Threat types
      threatTypes: {
        en: {
          SUSPICIOUS_URL: "Suspicious URL",
          PHISHING_CONTENT: "Phishing Content",
          SUSPICIOUS_KEYWORD: "Suspicious Keyword",
          URGENCY_MANIPULATION: "Urgency Manipulation",
          URL_SHORTENER: "URL Shortener",
          MALFORMED_URL: "Malformed URL",
          IP_BASED_URL: "IP-based URL",
          INSECURE_PROTOCOL: "Insecure Protocol"
        },
        hi: {
          SUSPICIOUS_URL: "संदिग्ध URL",
          PHISHING_CONTENT: "फिशिंग सामग्री",
          SUSPICIOUS_KEYWORD: "संदिग्ध कीवर्ड",
          URGENCY_MANIPULATION: "तात्कालिकता का दुरुपयोग",
          URL_SHORTENER: "URL शॉर्टनर",
          MALFORMED_URL: "दोषपूर्ण URL",
          IP_BASED_URL: "IP-आधारित URL",
          INSECURE_PROTOCOL: "असुरक्षित प्रोटोकॉल"
        },
        bn: {
          SUSPICIOUS_URL: "সন্দেহজনক URL",
          PHISHING_CONTENT: "ফিশিং কন্টেন্ট",
          SUSPICIOUS_KEYWORD: "সন্দেহজনক কীওয়ার্ড",
          URGENCY_MANIPULATION: "জরুরিত্বের অপব্যবহার",
          URL_SHORTENER: "URL সংক্ষিপ্তকারী",
          MALFORMED_URL: "ত্রুটিপূর্ণ URL",
          IP_BASED_URL: "IP-ভিত্তিক URL",
          INSECURE_PROTOCOL: "অনিরাপদ প্রোটোকল"
        }
      },

      // UI Labels
      ui: {
        en: {
          scanNow: "Scan Now",
          scanning: "Scanning...",
          riskLevel: "Risk Level",
          recommendations: "Recommendations",
          threats: "Detected Threats",
          scanResults: "Scan Results",
          high: "HIGH",
          medium: "MEDIUM",
          low: "LOW"
        },
        hi: {
          scanNow: "अभी स्कैन करें",
          scanning: "स्कैन कर रहे हैं...",
          riskLevel: "जोखिम स्तर",
          recommendations: "सिफारिशें",
          threats: "पता लगाए गए खतरे",
          scanResults: "स्कैन परिणाम",
          high: "उच्च",
          medium: "मध्यम",
          low: "कम"
        },
        bn: {
          scanNow: "এখনই স্ক্যান করুন",
          scanning: "স্ক্যান করা হচ্ছে...",
          riskLevel: "ঝুঁকির মাত্রা",
          recommendations: "সুপারিশসমূহ",
          threats: "শনাক্তকৃত হুমকি",
          scanResults: "স্ক্যান ফলাফল",
          high: "উচ্চ",
          medium: "মাঝারি",
          low: "কম"
        }
      }
    };
  }

  translate(key, category, language = 'en', fallbackLang = 'en') {
    try {
      // Try to get translation in requested language
      const translation = this.translations[category]?.[language]?.[key];
      if (translation) {
        return translation;
      }

      // Fallback to fallback language
      const fallbackTranslation = this.translations[category]?.[fallbackLang]?.[key];
      if (fallbackTranslation) {
        return fallbackTranslation;
      }

      // Return key if no translation found
      return key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  }

  getExplanation(riskLevel, language = 'en') {
    return this.translate(riskLevel, 'explanations', language);
  }

  getRecommendations(riskLevel, language = 'en') {
    return this.translate(riskLevel, 'recommendations', language) || [];
  }

  getThreatTypeName(threatType, language = 'en') {
    return this.translate(threatType, 'threatTypes', language);
  }

  getUILabel(label, language = 'en') {
    return this.translate(label, 'ui', language);
  }

  // Detect language from content
  detectLanguage(text) {
    const patterns = {
      hi: /[\u0900-\u097F]/,  // Devanagari
      bn: /[\u0980-\u09FF]/,  // Bengali
      ta: /[\u0B80-\u0BFF]/,  // Tamil
      te: /[\u0C00-\u0C7F]/,  // Telugu
      mr: /[\u0900-\u097F]/,  // Marathi (shares Devanagari with Hindi)
      gu: /[\u0A80-\u0AFF]/   // Gujarati
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        return lang;
      }
    }

    return 'en'; // Default to English
  }

  // Get supported languages
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' }
    ];
  }

  // Localize analysis result
  localizeAnalysisResult(analysis, language = 'en') {
    const localized = { ...analysis };

    // Translate explanation
    localized.explanation = this.getExplanation(analysis.riskLevel, language);

    // Translate recommendations
    localized.recommendations = this.getRecommendations(analysis.riskLevel, language);

    // Translate threat types
    if (localized.threats) {
      localized.threats = localized.threats.map(threat => ({
        ...threat,
        localizedType: this.getThreatTypeName(threat.type, language)
      }));
    }

    // Add UI labels for frontend
    localized.uiLabels = {
      riskLevel: this.getUILabel('riskLevel', language),
      recommendations: this.getUILabel('recommendations', language),
      threats: this.getUILabel('threats', language),
      scanResults: this.getUILabel('scanResults', language)
    };

    return localized;
  }

  // Detect language from text (simplified)
  detectLanguage(text) {
    // Simple language detection based on character patterns
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0900-\u097F]/.test(text)) return 'mr'; // Marathi
    return 'en'; // Default to English
  }

  // Get UI label translation
  getUILabel(key, language = 'en') {
    return this.translate(key, 'ui', language);
  }

  // Get available languages
  getAvailableLanguages() {
    return ['en', 'hi', 'bn', 'ta', 'te', 'ml', 'gu', 'mr'];
  }
}
}

module.exports = new MultilingualService();