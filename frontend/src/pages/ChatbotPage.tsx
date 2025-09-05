import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  SmartToy as BotIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Lightbulb as TipIcon,
  Translate as TranslateIcon,
  Clear as ClearIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'tip' | 'warning' | 'analysis';
  metadata?: any;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  // Predefined responses for the AI mentor
  const responses = {
    en: {
      welcome: "🤖 Hello! I'm your AI Security Mentor. I'm here to help you stay safe online. You can ask me about phishing, password security, safe browsing, or any cybersecurity topic!",
      phishing: "🎣 Phishing is a cyber attack where attackers impersonate legitimate organizations to steal your personal information. Here are key signs to watch for:\n\n• Urgent language demanding immediate action\n• Suspicious sender email addresses\n• Generic greetings like 'Dear Customer'\n• Links that don't match the claimed destination\n• Requests for sensitive information via email\n\nAlways verify independently before taking action!",
      password: "🔐 Strong passwords are your first line of defense! Here's how to create them:\n\n• Use at least 12 characters\n• Mix uppercase, lowercase, numbers, and symbols\n• Avoid personal information\n• Use unique passwords for each account\n• Consider using a password manager\n• Enable two-factor authentication when available\n\nRemember: A strong password is like a strong lock on your digital door!",
      scam: "⚠️ Common scam warning signs:\n\n• Too-good-to-be-true offers\n• Pressure to act immediately\n• Requests for upfront payments\n• Poor grammar and spelling\n• Unsolicited contact\n• Requests for personal/financial information\n\nWhen in doubt, verify through official channels. Trust your instincts!",
      safe_browsing: "🌐 Stay safe while browsing:\n\n• Look for HTTPS (padlock icon) on websites\n• Avoid clicking suspicious links\n• Keep your browser updated\n• Use reputable antivirus software\n• Be cautious with downloads\n• Check website URLs carefully\n• Don't trust pop-up warnings\n\nYour browser is your gateway to the internet - keep it secure!",
      tips: [
        "💡 Daily Tip: Always log out of accounts when using public computers",
        "🔒 Security Reminder: Regular software updates patch security vulnerabilities",
        "📱 Mobile Safety: Be cautious when connecting to public Wi-Fi networks",
        "💳 Financial Safety: Monitor your bank statements regularly for unauthorized transactions",
        "📧 Email Security: Be suspicious of unexpected attachments, even from known contacts"
      ]
    },
    hi: {
      welcome: "🤖 नमस्ते! मैं आपका AI सुरक्षा गुरु हूं। मैं आपको ऑनलाइन सुरक्षित रहने में मदद करने के लिए यहां हूं। आप मुझसे फिशिंग, पासवर्ड सुरक्षा, सुरक्षित ब्राउज़िंग, या किसी भी साइबर सुरक्षा विषय के बारे में पूछ सकते हैं!",
      phishing: "🎣 फिशिंग एक साइबर हमला है जहां हमलावर आपकी व्यक्तिगत जानकारी चुराने के लिए वैध संगठनों का रूप धारण करते हैं। देखने योग्य मुख्य संकेत:\n\n• तत्काल कार्रवाई की मांग करने वाली भाषा\n• संदिग्ध भेजने वाले ईमेल पते\n• 'प्रिय ग्राहक' जैसे सामान्य अभिवादन\n• लिंक जो दावा किए गए गंतव्य से मेल नहीं खाते\n• ईमेल के माध्यम से संवेदनशील जानकारी की मांग\n\nकोई भी कार्रवाई करने से पहले हमेशा स्वतंत्र रूप से सत्यापित करें!",
      password: "🔐 मजबूत पासवर्ड आपकी पहली रक्षा पंक्ति हैं! उन्हें बनाने का तरीका:\n\n• कम से कम 12 वर्ण का उपयोग करें\n• बड़े अक्षर, छोटे अक्षर, संख्या और प्रतीकों को मिलाएं\n• व्यक्तिगत जानकारी से बचें\n• हर खाते के लिए अलग पासवर्ड का उपयोग करें\n• पासवर्ड मैनेजर का उपयोग करने पर विचार करें\n• जब उपलब्ध हो तो दो-कारक प्रमाणीकरण सक्षम करें\n\nयाद रखें: एक मजबूत पासवर्ड आपके डिजिटल दरवाजे पर एक मजबूत ताला की तरह है!",
      scam: "⚠️ सामान्य घोटाला चेतावनी संकेत:\n\n• बहुत अच्छे लगने वाले प्रस्ताव\n• तुरंत कार्य करने का दबाव\n• अग्रिम भुगतान की मांग\n• गलत व्याकरण और वर्तनी\n• अवांछित संपर्क\n• व्यक्तिगत/वित्तीय जानकारी की मांग\n\nसंदेह होने पर, आधिकारिक चैनलों के माध्यम से सत्यापित करें। अपनी सहज शक्ति पर भरोसा करें!",
      safe_browsing: "🌐 ब्राउज़िंग करते समय सुरक्षित रहें:\n\n• वेबसाइटों पर HTTPS (पैडलॉक आइकन) की तलाश करें\n• संदिग्ध लिंक पर क्लिक करने से बचें\n• अपना ब्राउज़र अपडेट रखें\n• प्रतिष्ठित एंटीवायरस सॉफ़्टवेयर का उपयोग करें\n• डाउनलोड के साथ सावधान रहें\n• वेबसाइट URLs को ध्यान से जांचें\n• पॉप-अप चेतावनियों पर भरोसा न करें\n\nआपका ब्राउज़र इंटरनेट का आपका गेटवे है - इसे सुरक्षित रखें!",
      tips: [
        "💡 दैनिक सुझाव: सार्वजनिक कंप्यूटर का उपयोग करते समय हमेशा लॉग आउट करें",
        "🔒 सुरक्षा अनुस्मारक: नियमित सॉफ़्टवेयर अपडेट सुरक्षा कमजोरियों को ठीक करते हैं",
        "📱 मोबाइल सुरक्षा: सार्वजनिक Wi-Fi नेटवर्क से कनेक्ट होते समय सावधान रहें",
        "💳 वित्तीय सुरक्षा: अनधिकृत लेनदेन के लिए नियमित रूप से अपने बैंक स्टेटमेंट की निगरानी करें",
        "📧 ईमेल सुरक्षा: ज्ञात संपर्कों से भी अप्रत्याशित अटैचमेंट पर संदेह करें"
      ]
    }
  };

  const quickActions = [
    { label: 'Check if this is phishing', icon: <SecurityIcon />, query: 'phishing' },
    { label: 'Password security tips', icon: <TipIcon />, query: 'password' },
    { label: 'Safe browsing guide', icon: <InfoIcon />, query: 'safe browsing' },
    { label: 'Scam prevention', icon: <WarningIcon />, query: 'scam' },
  ];

  useEffect(() => {
    // Send welcome message on component mount
    const welcomeMessage: Message = {
      id: 'welcome',
      content: responses[language as keyof typeof responses]?.welcome || responses.en.welcome,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim();
    if (!content) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    const currentLanguageResponses = responses[language as keyof typeof responses] || responses.en;
    
    let responseContent = '';
    let responseType: 'text' | 'tip' | 'warning' | 'analysis' = 'text';

    if (input.includes('phishing') || input.includes('फिशिंग')) {
      responseContent = currentLanguageResponses.phishing || responses.en.phishing;
      responseType = 'warning';
    } else if (input.includes('password') || input.includes('पासवर्ड')) {
      responseContent = currentLanguageResponses.password || responses.en.password;
      responseType = 'tip';
    } else if (input.includes('scam') || input.includes('धोखाधड़ी')) {
      responseContent = currentLanguageResponses.scam || responses.en.scam;
      responseType = 'warning';
    } else if (input.includes('browsing') || input.includes('ब्राउज़िंग')) {
      responseContent = currentLanguageResponses.safe_browsing || responses.en.safe_browsing;
      responseType = 'tip';
    } else if (input.includes('tip') || input.includes('सुझाव')) {
      const tips = currentLanguageResponses.tips || responses.en.tips;
      responseContent = tips[Math.floor(Math.random() * tips.length)];
      responseType = 'tip';
    } else if (input.includes('hello') || input.includes('hi') || input.includes('नमस्ते')) {
      responseContent = "👋 Hello! How can I help you stay secure today? You can ask me about phishing, passwords, safe browsing, or any cybersecurity topic.";
    } else if (input.includes('analyze') || input.includes('check')) {
      responseContent = "🔍 I can help analyze suspicious content! Please share the text, URL, or email you'd like me to examine for potential threats.";
      responseType = 'analysis';
    } else {
      // Default response with suggestions
      responseContent = "🤔 I understand you're asking about cybersecurity. Here are some topics I can help with:\n\n• Phishing identification\n• Password security\n• Safe browsing practices\n• Scam prevention\n• Threat analysis\n\nPlease ask me about any of these topics or share specific content you'd like me to analyze!";
    }

    return {
      id: Date.now().toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
      type: responseType
    };
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setLangAnchorEl(null);
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: 'welcome-new',
      content: responses[language as keyof typeof responses]?.welcome || responses.en.welcome,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'warning': return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'tip': return <TipIcon sx={{ color: 'success.main' }} />;
      case 'analysis': return <PsychologyIcon sx={{ color: 'info.main' }} />;
      default: return <BotIcon sx={{ color: 'primary.main' }} />;
    }
  };

  const getMessageColor = (type?: string) => {
    switch (type) {
      case 'warning': return 'warning.light';
      case 'tip': return 'success.light';
      case 'analysis': return 'info.light';
      default: return 'grey.100';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 2 }}>
          🤖 AI Security Mentor
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Your personal cybersecurity assistant - ask me anything about staying safe online!
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                  <BotIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">PhishGuard AI Mentor</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Online • Ready to help
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton
                  color="inherit"
                  onClick={(e) => setLangAnchorEl(e.currentTarget)}
                >
                  <TranslateIcon />
                </IconButton>
                <IconButton color="inherit" onClick={clearChat}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box
              sx={{
                flexGrow: 1,
                overflow: 'auto',
                p: 2,
                bgcolor: 'background.default',
              }}
            >
              <List>
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                          mb: 2,
                        }}
                      >
                        <ListItemAvatar
                          sx={{
                            minWidth: message.sender === 'user' ? 0 : 56,
                            mr: message.sender === 'user' ? 0 : 2,
                            ml: message.sender === 'user' ? 2 : 0,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                            }}
                          >
                            {message.sender === 'user' ? <PersonIcon /> : getMessageIcon(message.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            maxWidth: '80%',
                            bgcolor: message.sender === 'user' ? 'primary.main' : getMessageColor(message.type),
                            color: message.sender === 'user' ? 'white' : 'text.primary',
                            borderRadius: 2,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          <Typography variant="body1">{message.content}</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 1,
                              opacity: 0.7,
                            }}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </Typography>
                        </Paper>
                      </ListItem>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <BotIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        AI Mentor is typing...
                      </Typography>
                    </Paper>
                  </ListItem>
                )}
              </List>
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask me about cybersecurity..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  multiline
                  maxRows={3}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  sx={{ minWidth: 60 }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          {/* Quick Actions */}
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={() => handleSendMessage(action.query)}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      borderRadius: 2,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Daily Security Tips
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Enable 2FA"
                    secondary="Add an extra layer of security to your accounts"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Check URLs"
                    secondary="Always verify website addresses before entering data"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Update Software"
                    secondary="Keep your apps and OS updated for security patches"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Your Security Progress
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                  85%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Security Knowledge Score
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">12</Typography>
                  <Typography variant="caption">Threats Avoided</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="info.main">8</Typography>
                  <Typography variant="caption">Tips Learned</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">3</Typography>
                  <Typography variant="caption">Quizzes Passed</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Language Menu */}
      <Menu
        anchorEl={langAnchorEl}
        open={Boolean(langAnchorEl)}
        onClose={() => setLangAnchorEl(null)}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={language === lang.code}
          >
            <Typography sx={{ mr: 1 }}>{lang.flag}</Typography>
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default ChatbotPage;