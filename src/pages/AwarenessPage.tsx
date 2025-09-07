import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  School as SchoolIcon,
  Quiz as QuizIcon,
  Shield as ShieldIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  Security as SecurityIcon,
  BugReport as HackerIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const AwarenessPage: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<'basic' | 'advanced' | 'phishing' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hackTheHackerLevel, setHackTheHackerLevel] = useState(1);
  const [gameDialogOpen, setGameDialogOpen] = useState(false);

  // Sample quiz questions
  const quizzes = {
    basic: [
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
        explanation: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity.",
        difficulty: 'easy' as const
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
        explanation: "Phishing emails often use urgent language to pressure victims into acting quickly without thinking carefully about the request.",
        difficulty: 'easy' as const
      },
      {
        id: 3,
        question: "What should you do if you receive a suspicious email?",
        options: [
          "Click the links to verify if they're real",
          "Reply asking if it's legitimate",
          "Delete it and report to IT security",
          "Forward it to friends to warn them"
        ],
        correctAnswer: 2,
        explanation: "The safest approach is to delete suspicious emails and report them to your IT security team. Never click suspicious links or reply to such emails.",
        difficulty: 'medium' as const
      }
    ],
    advanced: [
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
        explanation: "Spear phishing is a targeted phishing attack directed at specific individuals, organizations, or businesses, often using personal information to make the attack more convincing.",
        difficulty: 'hard' as const
      },
      {
        id: 2,
        question: "Which HTTP header can help prevent clickjacking attacks?",
        options: [
          "X-Content-Type-Options",
          "X-Frame-Options",
          "X-XSS-Protection",
          "Content-Security-Policy"
        ],
        correctAnswer: 1,
        explanation: "X-Frame-Options header helps prevent clickjacking attacks by controlling whether a page can be embedded in a frame or iframe.",
        difficulty: 'hard' as const
      }
    ],
    phishing: [
      {
        id: 1,
        question: "You receive an email claiming to be from your bank asking you to verify your account details. What's the first thing you should check?",
        options: [
          "The sender's email address",
          "The bank's official website",
          "The urgency of the message",
          "The spelling and grammar"
        ],
        correctAnswer: 0,
        explanation: "Always check the sender's email address first. Legitimate banks use official domain names, not generic email services.",
        difficulty: 'medium' as const
      },
      {
        id: 2,
        question: "A website URL shows 'https://paypal-security.com-verify.tk'. What's wrong with this?",
        options: [
          "It uses HTTPS protocol",
          "It has suspicious domain extension and structure",
          "It mentions PayPal",
          "Nothing is wrong"
        ],
        correctAnswer: 1,
        explanation: "The URL has a suspicious structure with multiple hyphens and uses a .tk domain, which is often used by scammers. Legitimate PayPal URLs would be paypal.com.",
        difficulty: 'medium' as const
      }
    ]
  };

  const achievements: Achievement[] = [
    {
      id: 'first_quiz',
      name: 'Quiz Beginner',
      description: 'Complete your first quiz',
      icon: <QuizIcon />,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Score 100% on any quiz',
      icon: <StarIcon />,
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'security_expert',
      name: 'Security Expert',
      description: 'Complete all advanced quizzes',
      icon: <ShieldIcon />,
      unlocked: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'hack_defender',
      name: 'Hack Defender',
      description: 'Complete Hack the Hacker game',
      icon: <HackerIcon />,
      unlocked: false,
      progress: 0,
      maxProgress: 5
    }
  ];

  const handleQuizStart = (quizType: 'basic' | 'advanced' | 'phishing') => {
    setSelectedQuiz(quizType);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSubmit = () => {
    if (userAnswer === null) return;

    const currentQuiz = quizzes[selectedQuiz!];
    const isCorrect = userAnswer === currentQuiz[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    const currentQuiz = quizzes[selectedQuiz!];
    
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handleQuizClose = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  const hackTheHackerScenarios = [
    {
      level: 1,
      title: "Email Detective",
      description: "Identify phishing emails among legitimate ones",
      scenario: "You're a security analyst reviewing incoming emails. Can you spot the phishing attempts?",
      completed: false
    },
    {
      level: 2,
      title: "URL Inspector",
      description: "Analyze suspicious URLs and identify fake websites",
      scenario: "Examine these URLs and determine which ones are potentially malicious.",
      completed: false
    },
    {
      level: 3,
      title: "Social Engineering Defense",
      description: "Defend against social engineering attacks",
      scenario: "Handle phone calls and messages that try to trick you into revealing information.",
      completed: false
    },
    {
      level: 4,
      title: "Password Guardian",
      description: "Create and manage secure passwords",
      scenario: "Help users create strong passwords and identify weak ones.",
      completed: false
    },
    {
      level: 5,
      title: "Incident Response",
      description: "Respond to a simulated cyber attack",
      scenario: "A company has been attacked. Guide them through the proper response procedures.",
      completed: false
    }
  ];

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  const currentQuiz = selectedQuiz ? quizzes[selectedQuiz] : null;
  const currentQuizQuestion = currentQuiz ? currentQuiz[currentQuestion] : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 2 }}>
          🎓 Cybersecurity Awareness Hub
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Learn, practice, and master cybersecurity through interactive experiences
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Interactive Quizzes Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            📝 Interactive Security Quizzes
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    Basic Security
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Learn fundamental cybersecurity concepts and best practices
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="3 Questions" size="small" />
                    <Chip label="Beginner" size="small" sx={{ ml: 1 }} color="success" />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => handleQuizStart('basic')}
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <ShieldIcon sx={{ fontSize: 48, color: 'warning.main' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    Advanced Security
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Dive deeper into advanced cybersecurity topics and techniques
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="2 Questions" size="small" />
                    <Chip label="Advanced" size="small" sx={{ ml: 1 }} color="error" />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => handleQuizStart('advanced')}
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <SecurityIcon sx={{ fontSize: 48, color: 'error.main' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    Phishing Master
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Specialized training to identify and defend against phishing attacks
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="2 Questions" size="small" />
                    <Chip label="Intermediate" size="small" sx={{ ml: 1 }} color="warning" />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => handleQuizStart('phishing')}
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Hack the Hacker Game Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            🎮 Hack the Hacker Game
          </Typography>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <HackerIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Defend Against Cyber Attacks
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Experience realistic cyber attack scenarios and learn how to defend against them.
                  Progress through 5 challenging levels to become a cybersecurity expert!
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayIcon />}
                  onClick={() => setGameDialogOpen(true)}
                  sx={{ px: 4 }}
                >
                  Start Game
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {hackTheHackerScenarios.map((scenario, index) => (
              <Grid item xs={12} sm={6} md={4} key={scenario.level}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    opacity: scenario.completed ? 1 : 0.7,
                    border: scenario.level === hackTheHackerLevel ? '2px solid' : '1px solid',
                    borderColor: scenario.level === hackTheHackerLevel ? 'primary.main' : 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Level {scenario.level}
                      </Typography>
                      {scenario.completed && (
                        <CheckIcon sx={{ color: 'success.main', ml: 1 }} />
                      )}
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {scenario.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scenario.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            🏆 Achievements
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={3} key={achievement.id}>
                <Card 
                  sx={{ 
                    borderRadius: 3,
                    opacity: achievement.unlocked ? 1 : 0.6,
                    border: achievement.unlocked ? '2px solid' : '1px solid',
                    borderColor: achievement.unlocked ? 'success.main' : 'divider'
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: achievement.unlocked ? 'success.main' : 'text.disabled', mb: 2 }}>
                      {achievement.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {achievement.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {achievement.description}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(achievement.progress / achievement.maxProgress) * 100}
                      sx={{ borderRadius: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {achievement.progress}/{achievement.maxProgress}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Quiz Dialog */}
      <Dialog
        open={selectedQuiz !== null}
        onClose={handleQuizClose}
        maxWidth="md"
        fullWidth
      >
        {selectedQuiz && currentQuizQuestion && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {selectedQuiz.charAt(0).toUpperCase() + selectedQuiz.slice(1)} Security Quiz
                </Typography>
                <Button onClick={handleQuizClose}>
                  <CloseIcon />
                </Button>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((currentQuestion + 1) / currentQuiz!.length) * 100}
                sx={{ mt: 2 }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Question {currentQuestion + 1} of {currentQuiz!.length}
              </Typography>
            </DialogTitle>

            <DialogContent>
              {!showResults ? (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    {currentQuizQuestion.question}
                  </Typography>

                  <RadioGroup
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(parseInt(e.target.value))}
                  >
                    {currentQuizQuestion.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<Radio />}
                        label={option}
                        disabled={showExplanation}
                      />
                    ))}
                  </RadioGroup>

                  {showExplanation && (
                    <Alert
                      severity={userAnswer === currentQuizQuestion.correctAnswer ? 'success' : 'error'}
                      sx={{ mt: 3 }}
                    >
                      <Typography variant="body2">
                        {currentQuizQuestion.explanation}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <TrophyIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom>
                    Quiz Complete!
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Your Score: {score} / {currentQuiz!.length}
                  </Typography>
                  <Chip
                    label={`${Math.round((score / currentQuiz!.length) * 100)}%`}
                    color={getScoreColor(score, currentQuiz!.length)}
                    size="medium"
                  />
                  <Typography variant="body1" sx={{ mt: 3 }}>
                    {score === currentQuiz!.length 
                      ? "Perfect! You're a cybersecurity expert!" 
                      : score >= currentQuiz!.length * 0.8 
                        ? "Great job! You have strong security knowledge." 
                        : "Good effort! Consider reviewing the topics and trying again."}
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              {!showResults && (
                <>
                  {!showExplanation ? (
                    <Button
                      variant="contained"
                      onClick={handleAnswerSubmit}
                      disabled={userAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < currentQuiz!.length - 1 ? 'Next Question' : 'View Results'}
                    </Button>
                  )}
                </>
              )}
              {showResults && (
                <Button variant="contained" onClick={handleQuizClose}>
                  Close
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Hack the Hacker Game Dialog */}
      <Dialog
        open={gameDialogOpen}
        onClose={() => setGameDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">🎮 Hack the Hacker</Typography>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={hackTheHackerLevel - 1} orientation="vertical">
            {hackTheHackerScenarios.map((scenario) => (
              <Step key={scenario.level}>
                <StepLabel>
                  {scenario.title}
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {scenario.scenario}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      // Game logic would go here
                      alert(`Starting ${scenario.title}...`);
                    }}
                  >
                    Start Level
                  </Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGameDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AwarenessPage;