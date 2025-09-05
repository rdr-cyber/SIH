// Content script for PhishGuard extension
class PhishGuardContent {
  constructor() {
    this.init();
  }

  init() {
    // Only run on main frame
    if (window.self !== window.top) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    // Monitor form submissions
    this.monitorForms();
    
    // Monitor suspicious links
    this.monitorLinks();
    
    // Scan page content
    this.scanPageContent();
    
    // Add right-click context menu for text analysis
    this.addContextMenu();
  }

  monitorForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        if (this.isCredentialForm(form)) {
          const isSecure = this.checkFormSecurity(form);
          if (!isSecure) {
            event.preventDefault();
            this.showFormWarning(form);
          }
        }
      });
    });
  }

  isCredentialForm(form) {
    const inputs = form.querySelectorAll('input');
    let hasPassword = false;
    let hasEmail = false;

    inputs.forEach(input => {
      if (input.type === 'password') hasPassword = true;
      if (input.type === 'email' || input.name.toLowerCase().includes('email')) hasEmail = true;
    });

    return hasPassword && (hasEmail || this.hasUsernameField(inputs));
  }

  hasUsernameField(inputs) {
    return Array.from(inputs).some(input => 
      input.name.toLowerCase().includes('username') ||
      input.name.toLowerCase().includes('user') ||
      input.placeholder.toLowerCase().includes('username')
    );
  }

  checkFormSecurity(form) {
    // Check if form is submitted over HTTPS
    if (window.location.protocol !== 'https:') return false;
    
    // Check if form action is suspicious
    const action = form.action || window.location.href;
    const actionUrl = new URL(action, window.location.href);
    
    // Check for suspicious domains
    const suspiciousPatterns = [
      /\.(tk|ml|ga|cf)$/,
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/,
      /-security-/,
      /-verify-/,
      /-update-/
    ];

    return !suspiciousPatterns.some(pattern => pattern.test(actionUrl.hostname));
  }

  showFormWarning(form) {
    const warning = document.createElement('div');
    warning.id = 'phishguard-form-warning';
    warning.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 9999;
        max-width: 300px;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <strong>⚠️ PhishGuard Warning</strong>
        <p style="margin: 10px 0;">This form appears suspicious. Verify the website before entering credentials.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: white;
          color: #f44336;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        ">Dismiss</button>
      </div>
    `;
    
    document.body.appendChild(warning);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (warning.parentElement) {
        warning.remove();
      }
    }, 10000);
  }

  monitorLinks() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      link.addEventListener('mouseover', (event) => {
        this.checkLinkOnHover(event.target);
      });
      
      link.addEventListener('click', (event) => {
        if (this.isSuspiciousLink(event.target)) {
          event.preventDefault();
          this.showLinkWarning(event.target);
        }
      });
    });
  }

  checkLinkOnHover(link) {
    const href = link.href;
    if (this.isSuspiciousLink(link)) {
      this.showLinkTooltip(link, 'This link appears suspicious');
    }
  }

  isSuspiciousLink(link) {
    const href = link.href;
    if (!href) return false;

    try {
      const url = new URL(href);
      
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /\.(tk|ml|ga|cf)$/,
        /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/,
        /bit\.ly|tinyurl\.com|t\.co/,
        /-security-|secure-|verification-/
      ];

      // Check for URL mismatch with link text
      const linkText = link.textContent.toLowerCase();
      if (linkText.includes('paypal') && !url.hostname.includes('paypal.com')) return true;
      if (linkText.includes('amazon') && !url.hostname.includes('amazon.com')) return true;
      if (linkText.includes('google') && !url.hostname.includes('google.com')) return true;

      return suspiciousPatterns.some(pattern => pattern.test(url.hostname));
    } catch (error) {
      return true; // Malformed URLs are suspicious
    }
  }

  showLinkTooltip(link, message) {
    // Remove existing tooltip
    const existingTooltip = document.getElementById('phishguard-tooltip');
    if (existingTooltip) existingTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'phishguard-tooltip';
    tooltip.innerHTML = `
      <div style="
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ⚠️ ${message}
      </div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = link.getBoundingClientRect();
    const tooltipDiv = tooltip.firstElementChild;
    tooltipDiv.style.left = rect.left + 'px';
    tooltipDiv.style.top = (rect.bottom + 5) + 'px';

    // Remove tooltip after 3 seconds
    setTimeout(() => tooltip.remove(), 3000);
  }

  showLinkWarning(link) {
    const warning = document.createElement('div');
    warning.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
      ">
        <div style="
          background: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          text-align: center;
        ">
          <h3 style="color: #f44336; margin-top: 0;">⚠️ Suspicious Link Detected</h3>
          <p>The link you clicked appears to be suspicious:</p>
          <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">
            ${link.href}
          </p>
          <p>Are you sure you want to continue?</p>
          <div style="margin-top: 20px;">
            <button onclick="this.closest('[id*=warning]').remove(); window.open('${link.href}', '_blank');" style="
              background: #f44336;
              color: white;
              border: none;
              padding: 10px 20px;
              margin: 0 10px;
              border-radius: 5px;
              cursor: pointer;
            ">Continue Anyway</button>
            <button onclick="this.closest('[id*=warning]').remove();" style="
              background: #4caf50;
              color: white;
              border: none;
              padding: 10px 20px;
              margin: 0 10px;
              border-radius: 5px;
              cursor: pointer;
            ">Stay Safe</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(warning);
  }

  async scanPageContent() {
    // Extract page data
    const pageData = {
      url: window.location.href,
      title: document.title,
      forms: this.extractForms(),
      links: this.extractLinks(),
      text: document.body.innerText.substring(0, 5000)
    };

    try {
      // Send to background script for analysis
      const response = await chrome.runtime.sendMessage({
        action: 'scanPage',
        data: pageData
      });

      if (response.success && response.result) {
        const analysis = response.result;
        if (analysis.riskLevel !== 'LOW') {
          this.showPageWarning(analysis);
        }
      }
    } catch (error) {
      console.error('Page scan failed:', error);
    }
  }

  extractForms() {
    return Array.from(document.forms).map(form => ({
      action: form.action,
      method: form.method,
      inputs: Array.from(form.elements).map(input => ({
        type: input.type,
        name: input.name,
        required: input.required
      }))
    }));
  }

  extractLinks() {
    return Array.from(document.links).slice(0, 20).map(link => link.href);
  }

  showPageWarning(analysis) {
    if (document.getElementById('phishguard-page-warning')) return;

    const warning = document.createElement('div');
    warning.id = 'phishguard-page-warning';
    warning.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: ${analysis.riskLevel === 'HIGH' ? '#f44336' : '#ff9800'};
        color: white;
        padding: 15px;
        text-align: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        <strong>⚠️ PhishGuard Security Alert</strong>
        <span style="margin: 0 20px;">${analysis.explanation}</span>
        <button onclick="this.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid white;
          padding: 5px 15px;
          border-radius: 3px;
          cursor: pointer;
          margin-left: 20px;
        ">Dismiss</button>
      </div>
    `;

    document.body.insertBefore(warning, document.body.firstChild);
  }

  addContextMenu() {
    document.addEventListener('contextmenu', (event) => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 10) {
        // Store selected text for context menu
        this.selectedText = selectedText;
      }
    });

    // Listen for messages from context menu
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'analyzeSelectedText' && this.selectedText) {
        this.analyzeText(this.selectedText);
      }
    });
  }

  async analyzeText(text) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'checkText',
        text: text
      });

      if (response.success && response.result) {
        const analysis = response.result;
        this.showTextAnalysisResult(analysis);
      }
    } catch (error) {
      console.error('Text analysis failed:', error);
    }
  }

  showTextAnalysisResult(analysis) {
    const result = document.createElement('div');
    result.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 2px solid ${analysis.riskLevel === 'HIGH' ? '#f44336' : analysis.riskLevel === 'MEDIUM' ? '#ff9800' : '#4caf50'};
        padding: 20px;
        border-radius: 10px;
        z-index: 9999;
        max-width: 350px;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      ">
        <h4 style="margin-top: 0; color: ${analysis.riskLevel === 'HIGH' ? '#f44336' : analysis.riskLevel === 'MEDIUM' ? '#ff9800' : '#4caf50'};">
          ${analysis.riskLevel === 'HIGH' ? '⚠️' : analysis.riskLevel === 'MEDIUM' ? '⚡' : '✅'} 
          Text Analysis Result
        </h4>
        <p><strong>Risk Level:</strong> ${analysis.riskLevel}</p>
        <p><strong>Risk Score:</strong> ${analysis.riskScore}/100</p>
        <p>${analysis.explanation}</p>
        ${analysis.threats.length > 0 ? `
          <div>
            <strong>Threats Detected:</strong>
            <ul>
              ${analysis.threats.map(threat => `<li>${threat.description}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        <button onclick="this.parentElement.remove()" style="
          background: #2196f3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          float: right;
        ">Close</button>
      </div>
    `;

    document.body.appendChild(result);

    // Auto-remove after 15 seconds
    setTimeout(() => {
      if (result.parentElement) {
        result.remove();
      }
    }, 15000);
  }
}

// Initialize content script
new PhishGuardContent();