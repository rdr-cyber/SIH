const request = require('supertest');
const app = require('../server');

describe('PhishGuard AI API', () => {
  describe('Health Check', () => {
    it('should return server status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('service', 'PhishGuard AI');
    });
  });

  describe('Detection API', () => {
    it('should analyze text for threats', async () => {
      const testData = {
        content: 'URGENT: Your account will be suspended! Click here to verify immediately.',
        type: 'text',
        language: 'en'
      };

      const response = await request(app)
        .post('/api/detection/analyze')
        .send(testData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('analysis');
      expect(response.body.analysis).toHaveProperty('riskLevel');
      expect(response.body.analysis).toHaveProperty('riskScore');
    });

    it('should detect high-risk phishing content', async () => {
      const phishingContent = {
        content: 'Congratulations! You have won $50,000! Click link to claim prize now.',
        type: 'text',
        language: 'en'
      };

      const response = await request(app)
        .post('/api/detection/analyze')
        .send(phishingContent)
        .expect(200);

      expect(response.body.analysis.riskLevel).toBe('HIGH');
      expect(response.body.analysis.riskScore).toBeGreaterThan(50);
    });
  });

  describe('Chatbot API', () => {
    it('should provide security tips', async () => {
      const response = await request(app)
        .get('/api/chatbot/tips')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('tips');
      expect(Array.isArray(response.body.tips)).toBe(true);
    });

    it('should handle multilingual tips', async () => {
      const response = await request(app)
        .get('/api/chatbot/tips?language=hi')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.language).toBe('hi');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid detection requests', async () => {
      const response = await request(app)
        .post('/api/detection/analyze')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle non-existent endpoints', async () => {
      await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });
  });
});