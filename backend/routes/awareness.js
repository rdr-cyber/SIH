const express = require('express');
const router = express.Router();

// Awareness and education routes
router.get('/quizzes', (req, res) => {
  const quizzes = {
    basic: {
      id: 'basic',
      title: 'Basic Security',
      description: 'Learn fundamental cybersecurity concepts',
      difficulty: 'beginner',
      questions: [
        {
          id: 1,
          question: "What is phishing?",
          options: [
            "A type of fishing with a phone",
            "A fraudulent attempt to obtain sensitive information",
            "A computer virus",
            "A social media platform"
          ],
          correctAnswer: 1,
          explanation: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity."
        },
        {
          id: 2,
          question: "Which of these is a common sign of a phishing email?",
          options: [
            "Professional email address",
            "Urgent language demanding immediate action",
            "Personalized greeting with your name",
            "Official company logo"
          ],
          correctAnswer: 1,
          explanation: "Phishing emails often use urgent language to pressure victims into acting quickly without thinking carefully about the request."
        }
      ]
    },
    advanced: {
      id: 'advanced',
      title: 'Advanced Security',
      description: 'Deep dive into advanced cybersecurity topics',
      difficulty: 'advanced',
      questions: [
        {
          id: 1,
          question: "What is spear phishing?",
          options: [
            "Phishing using spear fishing techniques",
            "Targeted phishing attack against specific individuals",
            "Phishing attacks through mobile phones",
            "Automated phishing campaigns"
          ],
          correctAnswer: 1,
          explanation: "Spear phishing is a targeted phishing attack directed at specific individuals, organizations, or businesses."
        }
      ]
    }
  };

  res.json({
    success: true,
    quizzes: quizzes
  });
});

router.post('/quiz/submit', (req, res) => {
  const { quizId, answers, timeSpent } = req.body;
  
  // This would typically calculate score and save to database
  const mockResults = {
    quizId: quizId,
    score: Math.floor(Math.random() * 100),
    totalQuestions: answers.length,
    correctAnswers: Math.floor(answers.length * 0.8),
    timeSpent: timeSpent,
    passed: true,
    certificate: {
      id: 'cert_' + Date.now(),
      issuedAt: new Date().toISOString()
    }
  };

  res.json({
    success: true,
    results: mockResults
  });
});

// Hack the Hacker game endpoints
router.get('/game/levels', (req, res) => {
  const levels = [
    {
      level: 1,
      title: "Email Detective",
      description: "Identify phishing emails among legitimate ones",
      scenario: "You're a security analyst reviewing incoming emails. Can you spot the phishing attempts?",
      unlocked: true,
      completed: false
    },
    {
      level: 2,
      title: "URL Inspector",
      description: "Analyze suspicious URLs and identify fake websites",
      scenario: "Examine these URLs and determine which ones are potentially malicious.",
      unlocked: false,
      completed: false
    },
    {
      level: 3,
      title: "Social Engineering Defense",
      description: "Defend against social engineering attacks",
      scenario: "Handle phone calls and messages that try to trick you into revealing information.",
      unlocked: false,
      completed: false
    },
    {
      level: 4,
      title: "Password Guardian",
      description: "Create and manage secure passwords",
      scenario: "Help users create strong passwords and identify weak ones.",
      unlocked: false,
      completed: false
    },
    {
      level: 5,
      title: "Incident Response",
      description: "Respond to a simulated cyber attack",
      scenario: "A company has been attacked. Guide them through the proper response procedures.",
      unlocked: false,
      completed: false
    }
  ];

  res.json({
    success: true,
    levels: levels
  });
});

router.post('/game/level/:levelId/start', (req, res) => {
  const { levelId } = req.params;
  
  // Mock game scenarios based on level
  const scenarios = {
    1: {
      type: 'email_detection',
      emails: [
        {
          id: 1,
          from: 'security@paypal.com',
          subject: 'Account Security Update',
          content: 'We have updated our security policies. Please review them at your convenience.',
          isPhishing: false
        },
        {
          id: 2,
          from: 'urgent@paypal-security.tk',
          subject: 'URGENT: Account Suspended',
          content: 'Your account has been suspended due to suspicious activity. Click here to restore: http://paypal-restore.malicious.com',
          isPhishing: true
        }
      ]
    },
    2: {
      type: 'url_analysis',
      urls: [
        'https://www.amazon.com/account',
        'http://amazon-security.verification.tk',
        'https://secure.microsoft.com',
        'http://microsoft-update.security-check.ml'
      ]
    }
  };

  res.json({
    success: true,
    gameSession: {
      sessionId: 'session_' + Date.now(),
      level: parseInt(levelId),
      scenario: scenarios[levelId] || scenarios[1],
      timeLimit: 300, // 5 minutes
      maxAttempts: 3
    }
  });
});

router.post('/game/level/:levelId/submit', (req, res) => {
  const { levelId } = req.params;
  const { sessionId, answers, timeSpent } = req.body;
  
  // Mock scoring logic
  const score = Math.floor(Math.random() * 100);
  const passed = score >= 70;
  
  res.json({
    success: true,
    results: {
      sessionId: sessionId,
      level: parseInt(levelId),
      score: score,
      passed: passed,
      timeSpent: timeSpent,
      feedback: passed ? 
        "Excellent work! You successfully identified the threats." :
        "Good effort! Review the explanations and try again.",
      nextLevelUnlocked: passed,
      pointsEarned: passed ? score * 10 : 0
    }
  });
});

// Achievement system
router.get('/achievements', (req, res) => {
  const achievements = [
    {
      id: 'first_quiz',
      name: 'Quiz Beginner',
      description: 'Complete your first quiz',
      icon: 'quiz',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Score 100% on any quiz',
      icon: 'star',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      pointsReward: 500
    },
    {
      id: 'security_expert',
      name: 'Security Expert',
      description: 'Complete all advanced quizzes',
      icon: 'shield',
      unlocked: false,
      progress: 0,
      maxProgress: 3,
      pointsReward: 1000
    },
    {
      id: 'hack_defender',
      name: 'Hack Defender',
      description: 'Complete Hack the Hacker game',
      icon: 'security',
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      pointsReward: 2000
    }
  ];

  res.json({
    success: true,
    achievements: achievements
  });
});

// Learning resources
router.get('/resources', (req, res) => {
  const resources = {
    articles: [
      {
        id: 1,
        title: "Understanding Phishing Attacks",
        description: "A comprehensive guide to identifying and preventing phishing attacks",
        category: "phishing",
        difficulty: "beginner",
        readTime: 5,
        url: "/resources/phishing-guide"
      },
      {
        id: 2,
        title: "Password Security Best Practices",
        description: "Learn how to create and manage strong passwords",
        category: "passwords",
        difficulty: "beginner",
        readTime: 7,
        url: "/resources/password-security"
      },
      {
        id: 3,
        title: "Social Engineering Defense",
        description: "Protect yourself from social engineering attacks",
        category: "social-engineering",
        difficulty: "intermediate",
        readTime: 10,
        url: "/resources/social-engineering"
      }
    ],
    videos: [
      {
        id: 1,
        title: "Phishing Attack Demonstration",
        description: "See how phishing attacks work in real-time",
        duration: 180,
        thumbnail: "/images/phishing-demo.jpg",
        url: "/videos/phishing-demo"
      },
      {
        id: 2,
        title: "Creating Strong Passwords",
        description: "Step-by-step guide to password creation",
        duration: 240,
        thumbnail: "/images/password-guide.jpg",
        url: "/videos/password-guide"
      }
    ],
    tips: [
      {
        id: 1,
        title: "Daily Security Tip",
        content: "Always verify sender identity before clicking email links",
        category: "email-safety"
      },
      {
        id: 2,
        title: "Quick Check",
        content: "Look for HTTPS and a padlock icon when entering sensitive information",
        category: "web-safety"
      },
      {
        id: 3,
        title: "Password Reminder",
        content: "Use unique passwords for each account and enable 2FA when available",
        category: "password-safety"
      }
    ]
  };

  res.json({
    success: true,
    resources: resources
  });
});

// Progress tracking
router.get('/progress', (req, res) => {
  const progress = {
    userId: 'demo_user',
    totalPoints: 1250,
    level: 3,
    levelProgress: 75,
    completedQuizzes: 5,
    completedGameLevels: 2,
    achievementsUnlocked: 3,
    streakDays: 7,
    lastActivity: new Date().toISOString(),
    stats: {
      totalScansPerformed: 23,
      threatsDetected: 8,
      averageQuizScore: 85,
      timeSpentLearning: 145 // minutes
    }
  };

  res.json({
    success: true,
    progress: progress
  });
});

module.exports = router;