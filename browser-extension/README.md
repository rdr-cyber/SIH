# PhishGuard Browser Extension

## 🛡️ AI-Powered Real-Time Protection

The PhishGuard browser extension provides real-time protection against phishing and scam websites using advanced AI detection algorithms.

## ✨ Features

### Real-Time Protection
- **Automatic URL Scanning**: Scans websites as you browse
- **Form Security Monitoring**: Detects suspicious login forms
- **Link Analysis**: Warns about dangerous links before clicking
- **Page Content Analysis**: Analyzes page content for phishing indicators

### AI-Powered Detection
- **Machine Learning Models**: Advanced NLP and pattern recognition
- **Multilingual Support**: Works in 15+ languages
- **Threat Intelligence**: Blockchain-verified threat data
- **Real-time Updates**: Latest threat patterns and signatures

### User-Friendly Interface
- **Popup Dashboard**: Quick security status and controls
- **Visual Warnings**: Clear alerts for different risk levels
- **Statistics Tracking**: Monitor threats blocked and pages scanned
- **One-Click Scanning**: Manual scan option for any page

## 🚀 Installation

### For Development
1. Clone or download the browser-extension folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the browser-extension folder

### For Users
- Install from Chrome Web Store (coming soon)
- Install from Firefox Add-ons (coming soon)

## 🔧 Configuration

### Required Permissions
- `activeTab`: Access current tab for scanning
- `storage`: Save settings and statistics
- `notifications`: Show security alerts
- `webNavigation`: Monitor page navigation
- `declarativeNetRequest`: Block malicious requests

### Settings
Access settings by clicking the gear icon in the popup:
- **Protection Level**: Choose sensitivity (Low/Medium/High)
- **Notifications**: Enable/disable alerts
- **Auto-blocking**: Automatically block high-risk sites
- **Language**: Select preferred language for alerts

## 🛠️ How It Works

### 1. Background Monitoring
```javascript
// Monitors all web navigation
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  checkUrl(details.url, details.tabId);
});
```

### 2. Content Analysis
```javascript
// Analyzes page content in real-time
class PhishGuardContent {
  monitorForms() {
    // Detects credential harvesting forms
  }
  
  monitorLinks() {
    // Scans links for suspicious patterns
  }
}
```

### 3. AI Detection
- **URL Pattern Analysis**: Suspicious domain structures
- **Content Scanning**: Phishing keywords and phrases
- **Form Analysis**: Credential harvesting detection
- **Link Verification**: Cross-reference with threat databases

## 🎯 Detection Capabilities

### Phishing Websites
- Fake banking sites
- Fraudulent e-commerce platforms
- Malicious social media clones
- Government portal imitations

### Scam Content
- Lottery/prize scams
- Tech support fraud
- Romance scams
- Investment fraud

### Suspicious Links
- URL shorteners
- Malformed domains
- IP-based addresses
- Suspicious parameters

## 📊 Security Indicators

### Risk Levels
- **🚨 HIGH**: Immediate threat, block access
- **⚠️ MEDIUM**: Suspicious content, proceed with caution
- **✅ LOW**: Safe content, no threats detected

### Visual Indicators
- **Badge Icons**: Show risk level on extension icon
- **Page Overlays**: Full-screen warnings for high-risk sites
- **Form Warnings**: Alerts when entering credentials on suspicious forms
- **Link Tooltips**: Hover warnings for dangerous links

## 🔗 Integration

### Backend API
```javascript
const apiUrl = 'http://localhost:5000/api';

// Check URL safety
fetch(`${apiUrl}/detection/check-url`, {
  method: 'POST',
  body: JSON.stringify({ url: suspiciousUrl })
});
```

### Blockchain Verification
- Threat intelligence verified on blockchain
- Immutable threat reporting
- Decentralized security data

## 🌐 Multilingual Support

### Supported Languages
- English
- हिंदी (Hindi)
- বাংলা (Bengali)
- தமிழ் (Tamil)
- తెలుగు (Telugu)
- मराठी (Marathi)
- ગુજરાતી (Gujarati)

### Language Detection
```javascript
// Automatically detects content language
const language = multilingualService.detectLanguage(content);
const localizedWarning = getWarning(language);
```

## 📱 Cross-Platform

### Browser Compatibility
- ✅ Chrome/Chromium (Manifest V3)
- ✅ Edge (Chromium-based)
- 🔄 Firefox (in development)
- 🔄 Safari (planned)

### Mobile Support
- 📱 Android Chrome (limited features)
- 📱 iOS Safari (planned)

## 🔐 Privacy & Security

### Data Protection
- **No Personal Data Collection**: Only analyzes content for threats
- **Local Processing**: Most analysis done locally
- **Anonymous Statistics**: Only aggregate, non-identifying data
- **Secure Communication**: All API calls encrypted

### Transparency
- **Open Source Components**: Core detection logic available
- **Blockchain Verification**: Threat data publicly verifiable
- **Community Reporting**: Crowdsourced threat intelligence

## 🆘 Support

### Reporting Issues
1. Click "Report Site" in the extension popup
2. Email: security@phishguard.ai
3. GitHub Issues: [repository link]

### Getting Help
- **Help Documentation**: Click "Help" in popup
- **Video Tutorials**: Available on our website
- **Community Forum**: User discussions and tips

## 🔄 Updates

### Automatic Updates
- **Threat Signatures**: Updated hourly
- **Extension Updates**: Pushed via browser stores
- **AI Models**: Continuous learning from new threats

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Multilingual support added
- **v1.2.0**: Blockchain integration (planned)

## 🤝 Contributing

### For Developers
1. Fork the repository
2. Create feature branch
3. Submit pull request
4. Include tests for new features

### For Security Researchers
- **Responsible Disclosure**: security@phishguard.ai
- **Bug Bounty Program**: Coming soon
- **Threat Intelligence**: Submit new threat samples

## 📄 License

MIT License - See LICENSE file for details

## 🎯 Digital India Impact

PhishGuard contributes to Digital India initiatives by:
- **Protecting Citizens**: Safeguarding against cyber threats
- **Education**: Raising cybersecurity awareness
- **Innovation**: Using AI for national security
- **Accessibility**: Multilingual support for all Indians

---

**Stay Safe Online with PhishGuard! 🛡️**