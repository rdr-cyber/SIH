# Contributing to PhishGuard AI

Thank you for your interest in contributing to PhishGuard AI! This project aims to protect millions of Indians from cyber threats while promoting digital literacy.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- MongoDB (optional for full functionality)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/phishguard-ai.git
   cd phishguard-ai
   ```

2. **Install Dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for new React components
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Project Structure
```
phishguard-ai/
├── backend/          # Node.js/Express API
├── frontend/         # React.js application
├── browser-extension/# Chrome/Firefox extension
├── docs/            # Documentation
└── tests/           # Test files
```

### Naming Conventions
- **Files**: Use kebab-case for files (`phishing-detector.js`)
- **Components**: Use PascalCase for React components (`ScannerPage.tsx`)
- **Variables**: Use camelCase for variables (`isPhishing`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (`API_BASE_URL`)

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information
- Console errors

## ✨ Feature Requests

We welcome feature suggestions! Please:
- Check existing issues first
- Describe the problem you're solving
- Explain your proposed solution
- Consider backward compatibility

## 🔒 Security

For security vulnerabilities:
- **DO NOT** open public issues
- Email: security@phishguard.ai
- Use GPG key: [Public Key Link]

## 🧪 Testing

### Running Tests
```bash
# Backend tests
npm test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e
```

### Writing Tests
- Write unit tests for new functions
- Add integration tests for API endpoints
- Include accessibility tests for UI components

## 📋 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git commit -m "feat: add multilingual support for Tamil"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Backward compatibility maintained
- [ ] Security implications considered

## 📚 Documentation

Help improve our docs:
- Fix typos and grammar
- Add examples and tutorials
- Translate to regional languages
- Create video tutorials

## 🌍 Internationalization

We support 15+ Indian languages:
- Add translations in `frontend/src/locales/`
- Follow ICU message format
- Test with RTL languages
- Consider cultural context

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/phishguard)
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contribute@phishguard.ai

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Invited to contributor events
- Eligible for open source awards

## 📜 Code of Conduct

### Our Pledge
We foster an open and welcoming environment for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, sexual orientation

### Our Standards
**Positive behavior:**
- Using welcoming and inclusive language
- Respecting differing viewpoints
- Accepting constructive criticism
- Focusing on community benefit
- Showing empathy towards others

**Unacceptable behavior:**
- Harassment of any kind
- Trolling, insulting comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information

### Enforcement
Report violations to: conduct@phishguard.ai

## 🎯 Project Goals

Remember our mission:
- **Protect** 1.4 billion Indians from cyber threats
- **Educate** users through gamified learning
- **Innovate** with AI and blockchain technology
- **Include** all communities through multilingual support

## 🙏 Thank You

Every contribution matters in building a safer digital India!

---

*This project is part of Smart India Hackathon and supports Digital India initiatives.*