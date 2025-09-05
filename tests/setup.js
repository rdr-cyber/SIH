// Test setup file
console.log('🧪 Setting up PhishGuard AI tests...');

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '5002';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/phishguard_test';

// Global test helpers
global.expectToBeArray = (received) => {
  expect(Array.isArray(received)).toBe(true);
};

global.expectToHaveRequiredFields = (obj, fields) => {
  fields.forEach(field => {
    expect(obj).toHaveProperty(field);
  });
};

// Suppress console.log during tests unless CI
if (!process.env.CI) {
  console.log = jest.fn();
  console.error = jest.fn();
}

console.log('✅ Test setup completed');