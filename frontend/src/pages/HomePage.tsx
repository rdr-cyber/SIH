import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Scanner as ScannerIcon,
  School as SchoolIcon,
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  Speed as SpeedIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <ScannerIcon sx={{ fontSize: 40 }} />,
      title: 'Real-Time Scanning',
      description: 'AI-powered detection of phishing URLs, suspicious emails, and scam messages across multiple platforms.',
      link: '/scanner',
      color: theme.palette.primary.main,
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Interactive Learning',
      description: 'Gamified cybersecurity awareness with quizzes, simulations, and the "Hack the Hacker" challenge.',
      link: '/awareness',
      color: theme.palette.secondary.main,
    },
    {
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      title: 'AI Security Mentor',
      description: 'Personal AI assistant providing real-time cybersecurity tips and guidance in multiple languages.',
      link: '/chatbot',
      color: theme.palette.success.main,
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Threat Intelligence',
      description: 'Blockchain-verified threat data sharing and comprehensive security analytics dashboard.',
      link: '/statistics',
      color: theme.palette.warning.main,
    },
  ];

  const stats = [
    { number: '50K+', label: 'Threats Detected', icon: <ShieldIcon /> },
    { number: '99.8%', label: 'Accuracy Rate', icon: <SpeedIcon /> },
    { number: '15+', label: 'Languages Supported', icon: <LanguageIcon /> },
    { number: '24/7', label: 'Protection', icon: <SecurityIcon /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 3 }}
                >
                  Protect Yourself from{' '}
                  <span style={{ color: '#FFD700' }}>Phishing & Scams</span>
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  AI-powered detection and awareness platform designed for Digital India.
                  Real-time protection with multilingual support.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/impact"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    View Impact
                  </Button>
                  <Button
                    component={Link}
                    to="/scanner"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Start Scanning
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <SecurityIcon
                    sx={{
                      fontSize: { xs: 200, md: 300 },
                      opacity: 0.1,
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 4,
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                      🔐 PhishGuard AI
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Advanced machine learning algorithms protect you from the latest cyber threats
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Chip label="Real-time" color="success" />
                      <Chip label="AI-Powered" color="info" />
                      <Chip label="Multilingual" color="warning" />
                    </Box>
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: 'bold' }}
          >
            Comprehensive Security Suite
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box sx={{ color: feature.color, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        component={Link}
                        to={feature.link}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      >
                        Explore
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Secure Your Digital Life?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users protecting themselves with PhishGuard AI
            </Typography>
            <Button
              component={Link}
              to="/scanner"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;