import React, { useState, useEffect, useRef, memo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Chip,
  useTheme,
  Avatar,
  Fab,
  IconButton,
  alpha,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Badge
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
  AutoAwesome as AutoAwesomeIcon,
  Rocket as RocketIcon,
  Star as StarIcon,
  FlashOn as FlashOnIcon,
  Diamond as DiamondIcon,
  Whatshot as WhatshotIcon,
  EmojiEvents as TrophyIcon,
  Psychology as PsychologyIcon,
  Verified as VerifiedIcon,
  Groups as GroupsIcon,
  Bolt as BoltIcon,
  CloudUpload as CloudUploadIcon,
  Fingerprint as FingerprintIcon,
  VpnLock as VpnLockIcon,
  RadioButtonChecked as RadarIcon,
  Gavel as HammerIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Optimized Cyberpunk Animations - Reduced intensity for better performance
const neonGlow = keyframes`
  0% {
    text-shadow: 
      0 0 3px #00ffff,
      0 0 6px #00ffff;
  }
  50% {
    text-shadow: 
      0 0 5px #ff00ff,
      0 0 10px #ff00ff;
  }
  100% {
    text-shadow: 
      0 0 3px #00ffff,
      0 0 6px #00ffff;
  }
`;

const holographicShimmer = keyframes`
  0% {
    background-position: -100% center;
  }
  100% {
    background-position: 100% center;
  }
`;

const matrixRain = keyframes`
  0% {
    transform: translateY(-50vh);
    opacity: 0.7;
  }
  100% {
    transform: translateY(50vh);
    opacity: 0;
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
`;

const floatingOrb = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const cyberpunkBorder = keyframes`
  0% {
    border-color: #00ffff;
    box-shadow: 0 0 5px #00ffff;
  }
  33% {
    border-color: #ff00ff;
    box-shadow: 0 0 8px #ff00ff;
  }
  66% {
    border-color: #ffff00;
    box-shadow: 0 0 5px #ffff00;
  }
  100% {
    border-color: #00ffff;
    box-shadow: 0 0 5px #00ffff;
  }
`;

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  direction: number;
}

// Memoized components for better performance
const FloatingParticleComponent = memo(({ particle }: { particle: FloatingParticle }) => (
  <Box
    sx={{
      position: 'absolute',
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
      borderRadius: '50%',
      animation: `${matrixRain} ${particle.speed * 6}s linear infinite`,
      boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
      zIndex: 1,
      filter: 'blur(0.3px)',
      opacity: 0.6
    }}
  />
));

const HomePage: React.FC = () => {
  const theme = useTheme();
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize reduced number of floating particles for better performance
  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      color: ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'][Math.floor(Math.random() * 4)],
      direction: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  // Optimized threat counter with reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => {
        const increment = Math.floor(Math.random() * 3) + 1;
        return (prev + increment) % 99999;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Optimized user counter with reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => {
        const increment = Math.floor(Math.random() * 2) + 1;
        return (prev + increment) % 9999;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Cycle through features with reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 8);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Optimized scanning simulation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + Math.random() * 10 + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const superFeatures = [
    { icon: <SecurityIcon />, title: 'QUANTUM AI DETECTION', color: '#00ffff', glow: '0 0 10px #00ffff' },
    { icon: <RocketIcon />, title: 'HYPERSPEED SCANNING', color: '#ff00ff', glow: '0 0 10px #ff00ff' },
    { icon: <ShieldIcon />, title: 'FORTRESS PROTECTION', color: '#ffff00', glow: '0 0 10px #ffff00' },
    { icon: <PsychologyIcon />, title: 'NEURAL LEARNING', color: '#ff0080', glow: '0 0 10px #ff0080' },
    { icon: <DiamondIcon />, title: 'DIAMOND SECURITY', color: '#00ff80', glow: '0 0 10px #00ff80' },
    { icon: <FlashOnIcon />, title: 'LIGHTNING RESPONSE', color: '#8000ff', glow: '0 0 10px #8000ff' },
    { icon: <AutoAwesomeIcon />, title: 'COSMIC INTELLIGENCE', color: '#ff4000', glow: '0 0 10px #ff4000' },
    { icon: <RadarIcon />, title: 'OMNISCIENT RADAR', color: '#00ff40', glow: '0 0 10px #00ff40' }
  ];

  const godStats = [
    { 
      number: threatCount.toLocaleString(), 
      label: 'THREATS ANNIHILATED', 
      icon: <ShieldIcon />, 
      color: '#00ffff',
      description: 'Evil threats destroyed by our AI'
    },
    { 
      number: `${userCount.toLocaleString()}K`, 
      label: 'HEROES PROTECTED', 
      icon: <GroupsIcon />, 
      color: '#ff00ff',
      description: 'Digital warriors under our shield'
    },
    { 
      number: '99.99%', 
      label: 'GODLIKE ACCURACY', 
      icon: <VerifiedIcon />, 
      color: '#ffff00',
      description: 'Precision beyond mortal limits'
    },
    { 
      number: '∞', 
      label: 'ETERNAL VIGILANCE', 
      icon: <BoltIcon />, 
      color: '#ff0080',
      description: 'Never-ending protection power'
    }
  ];

  const ultimateFeatures = [
    {
      icon: <ScannerIcon sx={{ fontSize: 40 }} />,
      title: 'QUANTUM THREAT SCANNER',
      description: 'Peer into parallel dimensions to detect threats that haven\'t even been created yet. Our quantum AI scans across multiple realities.',
      link: '/scanner',
      color: '#00ffff',
      power: 'REALITY-BENDING',
      level: 'GOD TIER'
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'NEURAL CONSCIOUSNESS TRAINING',
      description: 'Upload cybersecurity knowledge directly into your brain matrix. Experience simulated hacker attacks in virtual reality.',
      link: '/awareness',
      color: '#ff00ff',
      power: 'MIND-UPLOADING',
      level: 'COSMIC'
    },
    {
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      title: 'OMNISCIENT AI ORACLE',
      description: 'Communicate with an AI entity that transcends time and space. Get answers to security questions from across the multiverse.',
      link: '/chatbot',
      color: '#ffff00',
      power: 'OMNISCIENCE',
      level: 'DIVINE'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'AKASHIC THREAT RECORDS',
      description: 'Access the universal database of all cyber threats across all timelines. Blockchain verified by interdimensional consensus.',
      link: '/statistics',
      color: '#ff0080',
      power: 'TIME-TRAVEL',
      level: 'TRANSCENDENT'
    },
  ];

  const startEpicScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  return (
    <Box 
      ref={heroRef}
      sx={{ 
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120,200,255,0.2) 0%, transparent 50%),
          linear-gradient(135deg, 
            rgba(0,0,0,0.95) 0%, 
            rgba(10,0,30,0.95) 25%, 
            rgba(0,10,30,0.95) 50%, 
            rgba(30,0,10,0.95) 75%, 
            rgba(0,0,0,0.95) 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Reduced number of floating particles for better performance */}
      {particles.map(particle => (
        <FloatingParticleComponent key={particle.id} particle={particle} />
      ))}

      {/* Simplified matrix grid background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          animation: `${matrixRain} 40s linear infinite`,
          zIndex: 1,
          opacity: 0.2
        }}
      />

        {/* EPIC HERO SECTION - OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              position: 'relative'
            }}
          >
            {/* Simplified pulsing aura */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                border: '1px solid rgba(0,255,255,0.2)',
                animation: `${pulseRing} 4s ease-out infinite`,
                zIndex: 0
              }}
            />

            {/* OPTIMIZED GODLIKE TITLE */}
            <motion.div
              animate={{ 
                scale: [1, 1.01, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '5rem', lg: '7rem' },
                  fontWeight: 900,
                  background: `
                    linear-gradient(
                      45deg,
                      #00ffff 0%,
                      #ff00ff 20%,
                      #ffff00 40%,
                      #ff0080 60%,
                      #00ff80 80%,
                      #8000ff 100%
                    )
                  `,
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: `${neonGlow} 3s ease-in-out infinite`,
                  mb: 2,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  position: 'relative'
                }}
              >
                PHISHGUARD
              </Typography>
            </motion.div>

            {/* OPTIMIZED AI SUBTITLE */}
            <motion.div
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.2rem', md: '2.5rem' },
                  fontWeight: 700,
                  background: `
                    linear-gradient(
                      90deg,
                      #ff6b6b 0%,
                      #4ecdc4 25%,
                      #45b7d1 50%,
                      #f9ca24 75%,
                      #6c5ce7 100%
                    )
                  `,
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: `${holographicShimmer} 4s ease-in-out infinite`,
                  mb: 4
                }}
              >
                ⚡ QUANTUM AI GUARDIAN ⚡
              </Typography>
            </motion.div>

            {/* Dynamic Feature Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4,
                    p: 3,
                    borderRadius: '20px',
                    background: `
                      linear-gradient(135deg, 
                        ${alpha(superFeatures[currentFeature].color, 0.15)} 0%,
                        transparent 50%,
                        ${alpha(superFeatures[currentFeature].color, 0.1)} 100%
                      )
                    `,
                    border: `2px solid ${superFeatures[currentFeature].color}`,
                    animation: `${cyberpunkBorder} 3s ease-in-out infinite`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: superFeatures[currentFeature].glow,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Box 
                      sx={{ 
                        color: superFeatures[currentFeature].color, 
                        fontSize: '3rem'
                      }}
                    >
                      {superFeatures[currentFeature].icon}
                    </Box>
                  </motion.div>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: superFeatures[currentFeature].color,
                        fontWeight: 900,
                        fontSize: { xs: '1.2rem', md: '2rem' },
                        letterSpacing: '0.05em'
                      }}
                    >
                      {superFeatures[currentFeature].title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        mt: 0.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      POWER LEVEL: MAXIMUM
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>

            {/* OPTIMIZED ACTION BUTTONS */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
              <motion.div
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: '0 0 30px rgba(255,107,107,0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketIcon />}
                  onClick={startEpicScan}
                  sx={{
                    fontSize: '1.2rem',
                    px: 4,
                    py: 2,
                    borderRadius: '25px',
                    background: `
                      linear-gradient(45deg, 
                        #ff6b6b 0%, 
                        #4ecdc4 25%, 
                        #45b7d1 50%, 
                        #f9ca24 75%, 
                        #ff6b6b 100%
                      )
                    `,
                    backgroundSize: '200% 200%',
                    color: 'white',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 20px rgba(255,107,107,0.4)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    animation: `${holographicShimmer} 3s ease-in-out infinite`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      animation: `${holographicShimmer} 1.5s ease-in-out infinite`,
                      boxShadow: '0 0 30px rgba(78,205,196,0.6)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  {isScanning ? 'SCANNING...' : 'ACTIVATE QUANTUM SCAN'}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: '0 0 30px rgba(255,255,0,0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to="/impact"
                  variant="outlined"
                  size="large"
                  startIcon={<TrophyIcon />}
                  sx={{
                    fontSize: '1.2rem',
                    px: 4,
                    py: 2,
                    borderRadius: '25px',
                    borderColor: '#ffff00',
                    borderWidth: '2px',
                    color: '#ffff00',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,0,0.05)',
                    boxShadow: '0 0 15px rgba(255,255,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: '#ffff00',
                      background: 'rgba(255,255,0,0.1)',
                      boxShadow: '0 0 25px rgba(255,255,0,0.5)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  WITNESS POWER
                </Button>
              </motion.div>
            </Box>

            {/* Optimized Scanning Progress */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Box
                  sx={{
                    maxWidth: '400px',
                    mx: 'auto',
                    p: 3,
                    borderRadius: '15px',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid #00ffff',
                    animation: `${cyberpunkBorder} 2s ease-in-out infinite`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#00ffff',
                      textAlign: 'center',
                      mb: 1,
                      fontWeight: 700,
                      fontSize: '1.2rem'
                    }}
                  >
                    QUANTUM SCAN IN PROGRESS...
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={scanProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
                        boxShadow: '0 0 5px #00ffff',
                        borderRadius: 4
                      }
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'center',
                      mt: 1
                    }}
                  >
                    Analyzing quantum threat patterns... {Math.floor(scanProgress)}%
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Box>
        </motion.div>

        {/* OPTIMIZED STATS SECTION */}
        <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '1.8rem', md: '3.5rem' },
                fontWeight: 900,
                background: `
                  linear-gradient(
                    45deg,
                    #ff6b6b 0%,
                    #4ecdc4 25%,
                    #45b7d1 50%,
                    #f9ca24 75%,
                    #6c5ce7 100%
                  )
                `,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${holographicShimmer} 4s ease-in-out infinite`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              ⚡ GODLIKE ACHIEVEMENTS ⚡
            </Typography>

            <Grid container spacing={3}>
              {godStats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        height: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: `
                          linear-gradient(135deg, 
                            ${alpha(stat.color, 0.1)} 0%,
                            transparent 50%,
                            ${alpha(stat.color, 0.05)} 100%
                          )
                        `,
                        border: `2px solid ${stat.color}`,
                        borderRadius: '20px',
                        backdropFilter: 'blur(15px)',
                        boxShadow: `0 0 20px ${alpha(stat.color, 0.3)}`,
                        animation: `${cyberpunkBorder} 5s ease-in-out infinite`,
                        '&:hover': {
                          boxShadow: `0 0 30px ${alpha(stat.color, 0.5)}`,
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity 
                        }}
                      >
                        <Box sx={{ color: stat.color, fontSize: '2.5rem', mb: 1 }}>
                          {stat.icon}
                        </Box>
                      </motion.div>
                      
                      <Typography
                        variant="h2"
                        sx={{
                          color: stat.color,
                          fontWeight: 900,
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          mb: 0.5,
                          textShadow: `0 0 10px ${stat.color}`
                        }}
                      >
                        {stat.number}
                      </Typography>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 700,
                          mb: 0.5,
                          fontSize: { xs: '0.7rem', md: '0.8rem' },
                          letterSpacing: '0.05em'
                        }}
                      >
                        {stat.label}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontStyle: 'italic',
                          fontSize: '0.7rem'
                        }}
                      >
                        {stat.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* OPTIMIZED POWERS SECTION */}
        <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '1.8rem', md: '3.5rem' },
                fontWeight: 900,
                background: `
                  linear-gradient(
                    135deg,
                    #ff0080 0%,
                    #8000ff 25%,
                    #00ff80 50%,
                    #ff4000 75%,
                    #00ffff 100%
                  )
                `,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${holographicShimmer} 4s ease-in-out infinite`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              🌟 TRANSCENDENT POWERS 🌟
            </Typography>

            <Grid container spacing={3}>
              {ultimateFeatures.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '350px',
                        background: `
                          linear-gradient(135deg, 
                            ${alpha(feature.color, 0.15)} 0%,
                            transparent 50%,
                            ${alpha(feature.color, 0.1)} 100%
                          )
                        `,
                        border: `2px solid ${feature.color}`,
                        borderRadius: '25px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: `0 0 30px ${alpha(feature.color, 0.3)}`,
                        animation: `${cyberpunkBorder} 6s ease-in-out infinite`,
                        '&:hover': {
                          boxShadow: `0 0 40px ${alpha(feature.color, 0.5)}`,
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Chip
                            label={feature.level}
                            sx={{
                              background: `linear-gradient(45deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                              color: 'white',
                              fontWeight: 800,
                              fontSize: '0.7rem',
                              boxShadow: `0 0 10px ${alpha(feature.color, 0.4)}`
                            }}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity 
                            }}
                          >
                            <Box sx={{ color: feature.color, fontSize: '2.5rem' }}>
                              {feature.icon}
                            </Box>
                          </motion.div>
                        </Box>

                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              color: feature.color,
                              fontWeight: 900,
                              mb: 2,
                              textShadow: `0 0 10px ${feature.color}`,
                              fontSize: { xs: '1.2rem', md: '1.5rem' }
                            }}
                          >
                            {feature.title}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'rgba(255,255,255,0.9)',
                              fontSize: '0.9rem',
                              lineHeight: 1.4,
                              mb: 2
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>

                        <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="contained"
                              component={Link}
                              to={feature.link}
                              startIcon={<BoltIcon />}
                              sx={{
                                background: `linear-gradient(45deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                                color: 'white',
                                fontWeight: 800,
                                px: 3,
                                py: 1,
                                borderRadius: '15px',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                boxShadow: `0 0 15px ${alpha(feature.color, 0.3)}`,
                                '&:hover': {
                                  boxShadow: `0 0 25px ${alpha(feature.color, 0.5)}`,
                                  transform: 'translateY(-2px)'
                                }
                              }}
                            >
                              UNLOCK {feature.power}
                            </Button>
                          </motion.div>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* OPTIMIZED CALL TO ACTION */}
        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.7)',
                border: '2px solid #00ffff',
                animation: `${cyberpunkBorder} 4s ease-in-out infinite`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #6c5ce7)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: `${holographicShimmer} 3s ease-in-out infinite`,
                  mb: 2,
                  fontWeight: 900
                }}
              >
                🚀 JOIN THE CYBER REVOLUTION 🚀
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 3,
                  fontWeight: 700
                }}
              >
                Be part of the elite force protecting India's digital future
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/scanner"
                  startIcon={<RocketIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                    color: 'white',
                    fontWeight: 900,
                    px: 4,
                    py: 1.5,
                    borderRadius: '25px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 20px rgba(0,255,255,0.5)',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(255,0,255,0.7)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  ACTIVATE YOUR POWER
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    );
};

export default memo(HomePage);