// Background service worker for PhishGuard extension
class PhishGuardBackground {
  constructor() {
    this.apiUrl = 'http://localhost:5000/api';
    this.suspiciousDomains = new Set();
    this.scanCache = new Map();
    this.init();
  }

  init() {
    // Listen for web navigation events
    chrome.webNavigation.onBeforeNavigate.addListener((details) => {
      if (details.frameId === 0) { // Main frame only
        this.checkUrl(details.url, details.tabId);
      }
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Listen for extension icon click
    chrome.action.onClicked.addListener((tab) => {
      this.scanCurrentPage(tab);
    });

    // Initialize suspicious domains list
    this.loadSuspiciousDomains();
  }

  async loadSuspiciousDomains() {
    try {
      // Load known suspicious domains from storage or API
      const result = await chrome.storage.local.get(['suspiciousDomains']);
      if (result.suspiciousDomains) {
        this.suspiciousDomains = new Set(result.suspiciousDomains);
      }
      
      // Fetch latest suspicious domains from API
      const response = await fetch(`${this.apiUrl}/detection/suspicious-domains`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.domains) {
          data.domains.forEach(domain => this.suspiciousDomains.add(domain));
          await chrome.storage.local.set({ suspiciousDomains: Array.from(this.suspiciousDomains) });
        }
      }
    } catch (error) {
      console.error('Failed to load suspicious domains:', error);
    }
  }

  async checkUrl(url, tabId) {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      // Quick check against known suspicious domains
      if (this.suspiciousDomains.has(domain)) {
        this.showWarning(tabId, 'high', 'Known malicious domain detected!');
        return;
      }

      // Check cache first
      const cacheKey = `${domain}:${urlObj.pathname}`;
      if (this.scanCache.has(cacheKey)) {
        const cached = this.scanCache.get(cacheKey);
        if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
          if (cached.riskLevel !== 'LOW') {
            this.showWarning(tabId, cached.riskLevel.toLowerCase(), cached.explanation);
          }
          return;
        }
      }

      // Perform API scan
      const response = await fetch(`${this.apiUrl}/detection/check-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const analysis = data.analysis;
          
          // Cache result
          this.scanCache.set(cacheKey, {
            ...analysis,
            timestamp: Date.now()
          });

          // Show warning if risk detected
          if (analysis.riskLevel !== 'LOW') {
            this.showWarning(tabId, analysis.riskLevel.toLowerCase(), analysis.explanation);
            
            // Update badge
            this.updateBadge(tabId, analysis.riskLevel);
          } else {
            this.updateBadge(tabId, 'safe');
          }
        }
      }
    } catch (error) {
      console.error('URL check failed:', error);
    }
  }

  async showWarning(tabId, riskLevel, message) {
    try {
      // Create notification
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'PhishGuard Security Alert',
        message: message,
        priority: riskLevel === 'high' ? 2 : 1
      });

      // Inject warning overlay for high-risk sites
      if (riskLevel === 'high') {
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: this.injectWarningOverlay,
          args: [message]
        });
      }
    } catch (error) {
      console.error('Failed to show warning:', error);
    }
  }

  injectWarningOverlay(message) {
    // This function runs in the page context
    if (document.getElementById('phishguard-warning')) return;

    const overlay = document.createElement('div');
    overlay.id = 'phishguard-warning';
    overlay.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(244, 67, 54, 0.95);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        color: white;
      ">
        <div style="
          background: white;
          color: #333;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
          <h2 style="color: #f44336; margin-top: 0;">⚠️ Security Warning</h2>
          <p style="font-size: 16px; margin: 20px 0;">${message}</p>
          <div style="margin-top: 20px;">
            <button id="phishguard-proceed" style="
              background: #f44336;
              color: white;
              border: none;
              padding: 10px 20px;
              margin: 0 10px;
              border-radius: 5px;
              cursor: pointer;
            ">I Understand the Risk</button>
            <button id="phishguard-goback" style="
              background: #4caf50;
              color: white;
              border: none;
              padding: 10px 20px;
              margin: 0 10px;
              border-radius: 5px;
              cursor: pointer;
            ">Go Back to Safety</button>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 15px;">
            Protected by PhishGuard AI
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Add event listeners
    document.getElementById('phishguard-proceed').onclick = () => {
      overlay.remove();
    };

    document.getElementById('phishguard-goback').onclick = () => {
      window.history.back();
    };
  }

  updateBadge(tabId, status) {
    let text = '';
    let color = '#4caf50'; // Green for safe

    switch (status) {
      case 'high':
        text = '⚠️';
        color = '#f44336'; // Red
        break;
      case 'medium':
        text = '⚡';
        color = '#ff9800'; // Orange
        break;
      case 'safe':
        text = '✓';
        color = '#4caf50'; // Green
        break;
    }

    chrome.action.setBadgeText({ text: text, tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: color, tabId: tabId });
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case 'scanPage':
          const pageData = request.data;
          const result = await this.scanPageContent(pageData);
          sendResponse({ success: true, result: result });
          break;

        case 'checkText':
          const textResult = await this.checkText(request.text);
          sendResponse({ success: true, result: textResult });
          break;

        case 'getSettings':
          const settings = await this.getSettings();
          sendResponse({ success: true, settings: settings });
          break;

        case 'updateSettings':
          await this.updateSettings(request.settings);
          sendResponse({ success: true });
          break;

        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Message handling error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async scanPageContent(pageData) {
    try {
      const response = await fetch(`${this.apiUrl}/detection/scan-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData)
      });

      if (response.ok) {
        const data = await response.json();
        return data.pageAnalysis;
      }
      throw new Error('Scan failed');
    } catch (error) {
      console.error('Page scan failed:', error);
      throw error;
    }
  }

  async checkText(text) {
    try {
      const response = await fetch(`${this.apiUrl}/detection/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: text,
          type: 'text',
          language: 'en'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.analysis;
      }
      throw new Error('Text check failed');
    } catch (error) {
      console.error('Text check failed:', error);
      throw error;
    }
  }

  async getSettings() {
    const result = await chrome.storage.sync.get({
      enabled: true,
      notifications: true,
      autoBlock: false,
      language: 'en',
      sensitivity: 'medium'
    });
    return result;
  }

  async updateSettings(settings) {
    await chrome.storage.sync.set(settings);
  }

  async scanCurrentPage(tab) {
    try {
      // Inject content script to get page data
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: this.extractPageData
      });

      if (results && results[0] && results[0].result) {
        const pageData = results[0].result;
        const analysis = await this.scanPageContent(pageData);
        
        // Show results in popup or notification
        if (analysis.riskLevel !== 'LOW') {
          this.showWarning(tab.id, analysis.riskLevel.toLowerCase(), analysis.explanation);
        } else {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'PhishGuard Scan Complete',
            message: 'Page appears to be safe!'
          });
        }
      }
    } catch (error) {
      console.error('Current page scan failed:', error);
    }
  }

  extractPageData() {
    // This function runs in the page context
    const forms = Array.from(document.forms).map(form => ({
      action: form.action,
      method: form.method,
      inputs: Array.from(form.elements).map(input => ({
        type: input.type,
        name: input.name,
        required: input.required
      }))
    }));

    const links = Array.from(document.links).slice(0, 20).map(link => link.href);

    return {
      url: window.location.href,
      title: document.title,
      forms: forms,
      links: links,
      text: document.body.innerText.substring(0, 5000) // First 5000 chars
    };
  }
}

// Initialize background service
new PhishGuardBackground();