// PhishGuard Popup JavaScript
class PhishGuardPopup {
  constructor() {
    this.currentTab = null;
    this.scanResults = null;
    this.stats = { threatsBlocked: 0, pagesScanned: 0 };
    this.init();
  }

  async init() {
    // Get current tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    this.currentTab = tabs[0];

    // Load saved statistics
    await this.loadStats();

    // Set up event listeners
    this.setupEventListeners();

    // Check current page status
    await this.checkCurrentPage();

    // Update UI
    this.updateUI();
  }

  setupEventListeners() {
    // Scan page button
    document.getElementById('scanPageBtn').addEventListener('click', () => {
      this.scanCurrentPage();
    });

    // Check URL button
    document.getElementById('checkUrlBtn').addEventListener('click', () => {
      this.showUrlInput();
    });

    // Report site button
    document.getElementById('reportSiteBtn').addEventListener('click', () => {
      this.reportSite();
    });

    // URL input actions
    document.getElementById('checkUrlSubmit').addEventListener('click', () => {
      this.checkUrl();
    });

    document.getElementById('cancelUrlCheck').addEventListener('click', () => {
      this.hideUrlInput();
    });

    // URL input enter key
    document.getElementById('urlInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.checkUrl();
      }
    });

    // Footer links
    document.getElementById('settingsLink').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });

    document.getElementById('helpLink').addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://phishguard.help' });
    });

    document.getElementById('aboutLink').addEventListener('click', () => {
      this.showAbout();
    });
  }

  async loadStats() {
    try {
      const result = await chrome.storage.local.get(['stats']);
      if (result.stats) {
        this.stats = result.stats;
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }

  async saveStats() {
    try {
      await chrome.storage.local.set({ stats: this.stats });
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  async checkCurrentPage() {
    if (!this.currentTab || !this.currentTab.url) return;

    try {
      const url = this.currentTab.url;
      
      // Skip non-http(s) URLs
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        this.updatePageStatus('safe', 'Local page - no scan needed');
        return;
      }

      // Show loading
      this.showLoading('Checking page security...');

      // Send message to background script
      const response = await chrome.runtime.sendMessage({
        action: 'scanPage',
        data: {
          url: url,
          title: this.currentTab.title
        }
      });

      this.hideLoading();

      if (response && response.success && response.result) {
        const analysis = response.result;
        this.scanResults = analysis;
        this.updatePageStatus(analysis.riskLevel.toLowerCase(), analysis.explanation);
        this.stats.pagesScanned++;
        await this.saveStats();
      } else {
        this.updatePageStatus('safe', 'No threats detected');
      }
    } catch (error) {
      console.error('Page check failed:', error);
      this.hideLoading();
      this.updatePageStatus('unknown', 'Unable to scan page');
    }
  }

  async scanCurrentPage() {
    if (!this.currentTab) return;

    try {
      // Show loading
      this.showLoading('Scanning page content...');

      // Execute content script to extract page data
      const results = await chrome.scripting.executeScript({
        target: { tabId: this.currentTab.id },
        func: this.extractPageData
      });

      if (results && results[0] && results[0].result) {
        const pageData = results[0].result;

        // Send to background for analysis
        const response = await chrome.runtime.sendMessage({
          action: 'scanPage',
          data: pageData
        });

        this.hideLoading();

        if (response && response.success && response.result) {
          const analysis = response.result;
          this.scanResults = analysis;
          this.showScanResults(analysis);
          this.stats.pagesScanned++;
          
          if (analysis.riskLevel !== 'LOW') {
            this.stats.threatsBlocked++;
          }
          
          await this.saveStats();
          this.updateUI();
        } else {
          this.showError('Scan failed. Please try again.');
        }
      } else {
        this.hideLoading();
        this.showError('Unable to access page content.');
      }
    } catch (error) {
      console.error('Page scan failed:', error);
      this.hideLoading();
      this.showError('Scan failed: ' + error.message);
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
      text: document.body.innerText.substring(0, 5000)
    };
  }

  showUrlInput() {
    document.getElementById('urlInputSection').style.display = 'block';
    document.getElementById('urlInput').focus();
    this.hideScanResults();
  }

  hideUrlInput() {
    document.getElementById('urlInputSection').style.display = 'none';
    document.getElementById('urlInput').value = '';
  }

  async checkUrl() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();

    if (!url) {
      this.showError('Please enter a URL to check');
      return;
    }

    try {
      // Add protocol if missing
      const fullUrl = url.startsWith('http') ? url : 'https://' + url;

      // Show loading
      this.showLoading('Checking URL security...');

      // Send to background script
      const response = await chrome.runtime.sendMessage({
        action: 'checkUrl',
        url: fullUrl
      });

      this.hideLoading();
      this.hideUrlInput();

      if (response && response.success && response.result) {
        const analysis = response.result;
        this.scanResults = analysis;
        this.showScanResults(analysis);
        
        if (analysis.riskLevel !== 'LOW') {
          this.stats.threatsBlocked++;
          await this.saveStats();
          this.updateUI();
        }
      } else {
        this.showError('URL check failed. Please try again.');
      }
    } catch (error) {
      console.error('URL check failed:', error);
      this.hideLoading();
      this.hideUrlInput();
      this.showError('URL check failed: ' + error.message);
    }
  }

  reportSite() {
    if (!this.currentTab || !this.currentTab.url) return;

    const reportUrl = `mailto:security@phishguard.ai?subject=Suspicious Site Report&body=URL: ${this.currentTab.url}%0A%0ADescription:%0A`;
    chrome.tabs.create({ url: reportUrl });
  }

  updatePageStatus(status, message) {
    const pageStatus = document.getElementById('pageStatus');
    const statusIcon = pageStatus.querySelector('.status-icon');
    const statusInfo = pageStatus.querySelector('.status-info');

    // Remove existing status classes
    pageStatus.classList.remove('warning', 'danger');

    switch (status) {
      case 'high':
        pageStatus.classList.add('danger');
        statusIcon.textContent = '🚨';
        statusInfo.innerHTML = `<h4>Page Status: High Risk</h4><p>${message}</p>`;
        break;
      case 'medium':
        pageStatus.classList.add('warning');
        statusIcon.textContent = '⚠️';
        statusInfo.innerHTML = `<h4>Page Status: Medium Risk</h4><p>${message}</p>`;
        break;
      case 'low':
      case 'safe':
        statusIcon.textContent = '✅';
        statusInfo.innerHTML = `<h4>Page Status: Safe</h4><p>${message}</p>`;
        break;
      default:
        statusIcon.textContent = '❓';
        statusInfo.innerHTML = `<h4>Page Status: Unknown</h4><p>${message}</p>`;
    }
  }

  showScanResults(analysis) {
    const scanResults = document.getElementById('scanResults');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const riskLevel = document.getElementById('riskLevel');
    const resultDescription = document.getElementById('resultDescription');
    const threatsList = document.getElementById('threatsList');
    const threatsUL = document.getElementById('threatsUL');

    // Update result icon and title
    switch (analysis.riskLevel) {
      case 'HIGH':
        resultIcon.textContent = '🚨';
        resultTitle.textContent = 'High Risk Detected';
        break;
      case 'MEDIUM':
        resultIcon.textContent = '⚠️';
        resultTitle.textContent = 'Medium Risk Detected';
        break;
      case 'LOW':
        resultIcon.textContent = '✅';
        resultTitle.textContent = 'Scan Complete - Safe';
        break;
    }

    // Update risk level badge
    const riskBadge = riskLevel.querySelector('.risk-badge');
    riskBadge.textContent = analysis.riskLevel;
    riskBadge.className = `risk-badge ${analysis.riskLevel.toLowerCase()}`;

    // Update description
    resultDescription.textContent = analysis.explanation;

    // Update threats list
    if (analysis.threats && analysis.threats.length > 0) {
      threatsUL.innerHTML = '';
      analysis.threats.forEach(threat => {
        const li = document.createElement('li');
        li.textContent = threat.description;
        threatsUL.appendChild(li);
      });
      threatsList.style.display = 'block';
    } else {
      threatsList.style.display = 'none';
    }

    scanResults.style.display = 'block';
  }

  hideScanResults() {
    document.getElementById('scanResults').style.display = 'none';
  }

  showLoading(message = 'Loading...') {
    const loading = document.getElementById('loadingState');
    loading.querySelector('p').textContent = message;
    loading.style.display = 'block';
    this.hideScanResults();
  }

  hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
  }

  showError(message) {
    // Simple error display - could be enhanced with a proper error component
    alert(message);
  }

  updateUI() {
    // Update statistics
    document.getElementById('threatsBlocked').textContent = this.stats.threatsBlocked;
    document.getElementById('pagesScanned').textContent = this.stats.pagesScanned;

    // Update status indicator
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    if (this.scanResults && this.scanResults.riskLevel === 'HIGH') {
      statusDot.style.backgroundColor = '#f44336';
      statusText.textContent = 'Threat Detected';
    } else if (this.scanResults && this.scanResults.riskLevel === 'MEDIUM') {
      statusDot.style.backgroundColor = '#ff9800';
      statusText.textContent = 'Warning';
    } else {
      statusDot.style.backgroundColor = '#4caf50';
      statusText.textContent = 'Protected';
    }
  }

  showAbout() {
    const aboutInfo = `
PhishGuard - AI Phishing Detector v1.0.0

AI-powered real-time protection against phishing and scam websites.

Features:
• Real-time threat detection
• Multilingual support
• Blockchain threat intelligence
• Educational awareness tools

Developed for Smart India Hackathon
Contributing to Digital India initiatives

© 2024 PhishGuard Team
    `;
    alert(aboutInfo);
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PhishGuardPopup();
});