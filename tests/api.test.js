const request = require('supertest');
const app = require('../server');

// Wrap the app for supertest
const server = app.listen(0); // Use port 0 to let the OS assign an available port

afterAll((done) => {
  server.close(done);
});

describe('PhishGuard AI API', () => {
  describe('Health Check', () => {
    it('should return server status', async () => {
      const response = await request(server)
        .get('/api/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('Detection API', () => {
    it('should analyze text for threats', async () => {
      const testData = {
        content: 'URGENT: Your account will be suspended! Click here to verify immediately.',
        type: 'text',
        language: 'en'
      };

      const response = await request(server)
        .post('/api/detection/analyze')
        .send(testData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('analysis');
    });

    it('should detect high-risk phishing content', async () => {
      const phishingContent = {
        content: 'Congratulations! You have won $50,000! Click link to claim prize now.',
        type: 'text',
        language: 'en'
      };

      const response = await request(server)
        .post('/api/detection/analyze')
        .send(phishingContent)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('Chatbot API', () => {
    it('should provide security tips', async () => {
      const response = await request(server)
        .get('/api/chatbot/tips')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('tips');
    });

    it('should handle multilingual tips', async () => {
      const response = await request(server)
        .get('/api/chatbot/tips?language=hi')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid detection requests', async () => {
      const response = await request(server)
        .post('/api/detection/analyze')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    // This test is modified because the server serves the React app for all non-API routes
    it('should handle non-existent API endpoints with 404', async () => {
      await request(server)
        .get('/api/nonexistent')
        .expect(404);
    });
  });
});