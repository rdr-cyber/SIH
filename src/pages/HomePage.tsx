import React, { useState, useEffect, useRef } from 'react';
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

// Epic Cyberpunk Animations
const neonGlow = keyframes`
  0% {
    text-shadow: 
      0 0 5px #00ffff,
      0 0 10px #00ffff,
      0 0 15px #00ffff,
      0 0 20px #00ffff;
  }
  25% {
    text-shadow: 
      0 0 5px #ff00ff,
      0 0 10px #ff00ff,
      0 0 15px #ff00ff,
      0 0 20px #ff00ff,
      0 0 25px #ff00ff;
  }
  50% {
    text-shadow: 
      0 0 5px #ffff00,
      0 0 10px #ffff00,
      0 0 15px #ffff00,
      0 0 20px #ffff00,
      0 0 25px #ffff00,
      0 0 30px #ffff00;
  }
  75% {
    text-shadow: 
      0 0 5px #ff0080,
      0 0 10px #ff0080,
      0 0 15px #ff0080,
      0 0 20px #ff0080,
      0 0 25px #ff0080;
  }
  100% {
    text-shadow: 
      0 0 5px #00ffff,
      0 0 10px #00ffff,
      0 0 15px #00ffff,
      0 0 20px #00ffff;
  }
`;

const holographicShimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const matrixRain = keyframes`
  0% {
    transform: translateY(-100vh) rotateX(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotateX(360deg);
    opacity: 0;
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

const floatingOrb = keyframes`
  0% {
    transform: translateY(0px) rotateZ(0deg);
  }
  33% {
    transform: translateY(-30px) rotateZ(120deg);
  }
  66% {
    transform: translateY(15px) rotateZ(240deg);
  }
  100% {
    transform: translateY(0px) rotateZ(360deg);
  }
`;

const cyberpunkBorder = keyframes`
  0% {
    border-color: #00ffff;
    box-shadow: 
      0 0 10px #00ffff,
      inset 0 0 10px rgba(0,255,255,0.1);
  }
  25% {
    border-color: #ff00ff;
    box-shadow: 
      0 0 15px #ff00ff,
      inset 0 0 15px rgba(255,0,255,0.1);
  }
  50% {
    border-color: #ffff00;
    box-shadow: 
      0 0 20px #ffff00,
      inset 0 0 20px rgba(255,255,0,0.1);
  }
  75% {
    border-color: #ff0080;
    box-shadow: 
      0 0 15px #ff0080,
      inset 0 0 15px rgba(255,0,128,0.1);
  }
  100% {
    border-color: #00ffff;
    box-shadow: 
      0 0 10px #00ffff,
      inset 0 0 10px rgba(0,255,255,0.1);
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

const HomePage: React.FC = () => {
  const theme = useTheme();
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize epic floating particles
  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1,
      color: ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#00ff80', '#8000ff'][Math.floor(Math.random() * 6)],
      direction: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  // Epic threat counter
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        return (prev + increment) % 999999;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // User counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => {
        const increment = Math.floor(Math.random() * 3) + 1;
        return (prev + increment) % 99999;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 8);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Epic scanning simulation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const superFeatures = [
    { icon: <SecurityIcon />, title: 'QUANTUM AI DETECTION', color: '#00ffff', glow: '0 0 20px #00ffff' },
    { icon: <RocketIcon />, title: 'HYPERSPEED SCANNING', color: '#ff00ff', glow: '0 0 20px #ff00ff' },
    { icon: <ShieldIcon />, title: 'FORTRESS PROTECTION', color: '#ffff00', glow: '0 0 20px #ffff00' },
    { icon: <PsychologyIcon />, title: 'NEURAL LEARNING', color: '#ff0080', glow: '0 0 20px #ff0080' },
    { icon: <DiamondIcon />, title: 'DIAMOND SECURITY', color: '#00ff80', glow: '0 0 20px #00ff80' },
    { icon: <FlashOnIcon />, title: 'LIGHTNING RESPONSE', color: '#8000ff', glow: '0 0 20px #8000ff' },
    { icon: <AutoAwesomeIcon />, title: 'COSMIC INTELLIGENCE', color: '#ff4000', glow: '0 0 20px #ff4000' },
    { icon: <RadarIcon />, title: 'OMNISCIENT RADAR', color: '#00ff40', glow: '0 0 20px #00ff40' }
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
      icon: <ScannerIcon sx={{ fontSize: 50 }} />,
      title: 'QUANTUM THREAT SCANNER',
      description: 'Peer into parallel dimensions to detect threats that haven\'t even been created yet. Our quantum AI scans across multiple realities.',
      link: '/scanner',
      color: '#00ffff',
      power: 'REALITY-BENDING',
      level: 'GOD TIER'
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
      title: 'NEURAL CONSCIOUSNESS TRAINING',
      description: 'Upload cybersecurity knowledge directly into your brain matrix. Experience simulated hacker attacks in virtual reality.',
      link: '/awareness',
      color: '#ff00ff',
      power: 'MIND-UPLOADING',
      level: 'COSMIC'
    },
    {
      icon: <ChatIcon sx={{ fontSize: 50 }} />,
      title: 'OMNISCIENT AI ORACLE',
      description: 'Communicate with an AI entity that transcends time and space. Get answers to security questions from across the multiverse.',
      link: '/chatbot',
      color: '#ffff00',
      power: 'OMNISCIENCE',
      level: 'DIVINE'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
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
          radial-gradient(circle at 20% 80%, rgba(120,119,198,0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,119,198,0.4) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120,200,255,0.3) 0%, transparent 50%),
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
      {/* Epic Floating Particles */}
      {particles.map(particle => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: `${matrixRain} ${particle.speed * 8}s linear infinite, ${floatingOrb} ${particle.speed * 6}s ease-in-out infinite`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            zIndex: 1,
            filter: 'blur(0.5px)',
            opacity: 0.8
          }}
        />
      ))}

      {/* Matrix Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: `${matrixRain} 20s linear infinite`,
          zIndex: 1,
          opacity: 0.3
        }}
      />

        {/* EPIC HERO SECTION - GOD LEVEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
              position: 'relative'
            }}
          >
            {/* Pulsing Aura */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                border: '2px solid rgba(0,255,255,0.3)',
                animation: `${pulseRing} 3s ease-out infinite`,
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                border: '1px solid rgba(255,0,255,0.2)',
                animation: `${pulseRing} 4s ease-out infinite 1s`,
                zIndex: 0
              }}
            />

            {/* GODLIKE TITLE */}
            <motion.div
              animate={{ 
                rotateY: [0, 5, 0, -5, 0],
                scale: [1, 1.02, 1, 1.02, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '7rem', lg: '10rem' },
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
                  backgroundSize: '400% 400%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: `${holographicShimmer} 3s ease-in-out infinite, ${neonGlow} 4s ease-in-out infinite`,
                  mb: 2,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  '&::before': {
                    content: '"PHISHGUARD"',
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    background: 'linear-gradient(45deg, rgba(0,255,255,0.3), rgba(255,0,255,0.3))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    zIndex: -1,
                    filter: 'blur(2px)'
                  }
                }}
              >
                PHISHGUARD
              </Typography>
            </motion.div>

            {/* ULTIMATE AI SUBTITLE */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotateX: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '4rem' },
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
                  backgroundSize: '300% 300%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: `${holographicShimmer} 5s ease-in-out infinite`,
                  mb: 4,
                  textShadow: '0 0 30px rgba(255,255,255,0.5)'
                }}
              >
                ⚡ QUANTUM AI GUARDIAN ⚡
              </Typography>
            </motion.div>

            {/* Dynamic Feature Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    mb: 6,
                    p: 4,
                    borderRadius: '30px',
                    background: `
                      linear-gradient(135deg, 
                        ${alpha(superFeatures[currentFeature].color, 0.2)} 0%,
                        transparent 50%,
                        ${alpha(superFeatures[currentFeature].color, 0.1)} 100%
                      )
                    `,
                    border: `3px solid ${superFeatures[currentFeature].color}`,
                    animation: `${cyberpunkBorder} 4s ease-in-out infinite`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      ${superFeatures[currentFeature].glow},
                      inset 0 0 20px ${alpha(superFeatures[currentFeature].color, 0.1)}
                    `,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${alpha(superFeatures[currentFeature].color, 0.3)}, transparent)`,
                      animation: `${holographicShimmer} 2s ease-in-out infinite`
                    }
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Box 
                      sx={{ 
                        color: superFeatures[currentFeature].color, 
                        fontSize: '4rem',
                        filter: `drop-shadow(${superFeatures[currentFeature].glow})`
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
                        textShadow: `0 0 20px ${superFeatures[currentFeature].color}`,
                        fontSize: { xs: '1.5rem', md: '3rem' },
                        letterSpacing: '0.1em'
                      }}
                    >
                      {superFeatures[currentFeature].title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        mt: 1
                      }}
                    >
                      POWER LEVEL: MAXIMUM
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>

            {/* EPIC ACTION BUTTONS */}
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', mb: 8 }}>
              <motion.div
                whileHover={{ 
                  scale: 1.15, 
                  rotateY: 15,
                  boxShadow: '0 0 50px rgba(255,107,107,0.8)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketIcon />}
                  onClick={startEpicScan}
                  sx={{
                    fontSize: '1.5rem',
                    px: 6,
                    py: 3,
                    borderRadius: '30px',
                    background: `
                      linear-gradient(45deg, 
                        #ff6b6b 0%, 
                        #4ecdc4 25%, 
                        #45b7d1 50%, 
                        #f9ca24 75%, 
                        #ff6b6b 100%
                      )
                    `,
                    backgroundSize: '300% 300%',
                    color: 'white',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: `
                      0 0 30px rgba(255,107,107,0.6),
                      inset 0 0 20px rgba(255,255,255,0.1)
                    `,
                    border: '2px solid rgba(255,255,255,0.3)',
                    animation: `${holographicShimmer} 3s ease-in-out infinite`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      animation: `${holographicShimmer} 1s ease-in-out infinite`,
                      boxShadow: `
                        0 0 50px rgba(78,205,196,0.8),
                        inset 0 0 30px rgba(255,255,255,0.2)
                      `,
                      transform: 'translateY(-5px)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transition: 'left 0.5s ease'
                    },
                    '&:hover::before': {
                      left: '100%'
                    }
                  }}
                >
                  {isScanning ? 'SCANNING...' : 'ACTIVATE QUANTUM SCAN'}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.15, 
                  rotateY: -15,
                  boxShadow: '0 0 50px rgba(255,255,0,0.8)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  component={Link}
                  to="/impact"
                  variant="outlined"
                  size="large"
                  startIcon={<TrophyIcon />}
                  sx={{
                    fontSize: '1.5rem',
                    px: 6,
                    py: 3,
                    borderRadius: '30px',
                    borderColor: '#ffff00',
                    borderWidth: '3px',
                    color: '#ffff00',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    backdropFilter: 'blur(20px)',
                    background: `
                      linear-gradient(45deg, 
                        rgba(255,255,0,0.1) 0%, 
                        transparent 50%, 
                        rgba(255,255,0,0.1) 100%
                      )
                    `,
                    boxShadow: `
                      0 0 25px rgba(255,255,0,0.4),
                      inset 0 0 15px rgba(255,255,0,0.1)
                    `,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: '#ffff00',
                      background: `
                        linear-gradient(45deg, 
                          rgba(255,255,0,0.2) 0%, 
                          rgba(255,255,0,0.1) 50%, 
                          rgba(255,255,0,0.2) 100%
                        )
                      `,
                      boxShadow: `
                        0 0 40px rgba(255,255,0,0.6),
                        inset 0 0 25px rgba(255,255,0,0.2)
                      `,
                      transform: 'translateY(-5px)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,0,0.1) 50%, transparent 70%)',
                      animation: `${holographicShimmer} 3s ease-in-out infinite`
                    }
                  }}
                >
                  WITNESS POWER
                </Button>
              </motion.div>
            </Box>

            {/* Epic Scanning Progress */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Box
                  sx={{
                    maxWidth: '500px',
                    mx: 'auto',
                    p: 4,
                    borderRadius: '20px',
                    background: 'rgba(0,0,0,0.8)',
                    border: '2px solid #00ffff',
                    animation: `${cyberpunkBorder} 2s ease-in-out infinite`,
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#00ffff',
                      textAlign: 'center',
                      mb: 2,
                      fontWeight: 700,
                      textShadow: '0 0 10px #00ffff'
                    }}
                  >
                    QUANTUM SCAN IN PROGRESS...
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={scanProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'rgba(0,255,255,0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
                        boxShadow: '0 0 10px #00ffff',
                        borderRadius: 6
                      }
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'center',
                      mt: 2
                    }}
                  >
                    Analyzing quantum threat patterns... {Math.floor(scanProgress)}%
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Box>
        </motion.div>

        {/* GODLIKE STATS SECTION */}
        <Container maxWidth="xl" sx={{ py: 12, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontSize: { xs: '2.5rem', md: '5rem' },
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
                backgroundSize: '400% 400%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${holographicShimmer} 4s ease-in-out infinite`,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              ⚡ GODLIKE ACHIEVEMENTS ⚡
            </Typography>

            <Grid container spacing={4}>
              {godStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        height: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: `
                          linear-gradient(135deg, 
                            ${alpha(stat.color, 0.15)} 0%,
                            transparent 50%,
                            ${alpha(stat.color, 0.1)} 100%
                          )
                        `,
                        border: `3px solid ${stat.color}`,
                        borderRadius: '25px',
                        backdropFilter: 'blur(25px)',
                        boxShadow: `0 0 30px ${alpha(stat.color, 0.4)}`,
                        animation: `${cyberpunkBorder} 6s ease-in-out infinite`,
                        '&:hover': {
                          boxShadow: `0 0 50px ${alpha(stat.color, 0.8)}`,
                          transform: 'translateY(-10px)'
                        }
                      }}
                    >
                      <motion.div
                        animate={{ rotateZ: 360, scale: [1, 1.1, 1] }}
                        transition={{ 
                          rotateZ: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Box sx={{ color: stat.color, fontSize: '4rem', mb: 2 }}>
                          {stat.icon}
                        </Box>
                      </motion.div>
                      
                      <Typography
                        variant="h2"
                        sx={{
                          color: stat.color,
                          fontWeight: 900,
                          fontSize: { xs: '2rem', md: '3rem' },
                          mb: 1,
                          textShadow: `0 0 20px ${stat.color}`,
                          animation: `${neonGlow} 3s ease-in-out infinite`
                        }}
                      >
                        {stat.number}
                      </Typography>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 700,
                          mb: 1,
                          fontSize: { xs: '0.8rem', md: '1rem' },
                          letterSpacing: '0.1em'
                        }}
                      >
                        {stat.label}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontStyle: 'italic'
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

        {/* TRANSCENDENT POWERS SECTION */}
        <Container maxWidth="xl" sx={{ py: 12, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontSize: { xs: '2.5rem', md: '5rem' },
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
                backgroundSize: '400% 400%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${holographicShimmer} 5s ease-in-out infinite`,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              🌟 TRANSCENDENT POWERS 🌟
            </Typography>

            <Grid container spacing={4}>
              {ultimateFeatures.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200, rotateY: 45 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 10 : -10 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '400px',
                        background: `
                          linear-gradient(135deg, 
                            ${alpha(feature.color, 0.2)} 0%,
                            transparent 50%,
                            ${alpha(feature.color, 0.1)} 100%
                          )
                        `,
                        border: `3px solid ${feature.color}`,
                        borderRadius: '30px',
                        backdropFilter: 'blur(30px)',
                        boxShadow: `0 0 40px ${alpha(feature.color, 0.4)}`,
                        animation: `${cyberpunkBorder} 8s ease-in-out infinite`,
                        '&:hover': {
                          boxShadow: `0 0 60px ${alpha(feature.color, 0.8)}`,
                          transform: 'translateY(-15px)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                          <Chip
                            label={feature.level}
                            sx={{
                              background: `linear-gradient(45deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                              color: 'white',
                              fontWeight: 800,
                              boxShadow: `0 0 15px ${alpha(feature.color, 0.6)}`
                            }}
                          />
                          <motion.div
                            animate={{ rotateY: 360, scale: [1, 1.2, 1] }}
                            transition={{ 
                              rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                              scale: { duration: 3, repeat: Infinity }
                            }}
                          >
                            <Box sx={{ color: feature.color }}>
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
                              mb: 3,
                              textShadow: `0 0 20px ${feature.color}`,
                              fontSize: { xs: '1.5rem', md: '2rem' }
                            }}
                          >
                            {feature.title}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'rgba(255,255,255,0.9)',
                              fontSize: '1rem',
                              lineHeight: 1.6,
                              mb: 3
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>

                        <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
                          <motion.div
                            whileHover={{ scale: 1.1, rotateZ: 5 }}
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
                                px: 4,
                                py: 1.5,
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                boxShadow: `0 0 25px ${alpha(feature.color, 0.5)}`,
                                '&:hover': {
                                  boxShadow: `0 0 40px ${alpha(feature.color, 0.8)}`,
                                  transform: 'translateY(-3px)'
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

        {/* EPIC CALL TO ACTION */}
        <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateX: 45 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 2, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: 'center',
                borderRadius: '40px',
                background: `
                  linear-gradient(135deg, 
                    rgba(255,107,107,0.2) 0%,
                    rgba(78,205,196,0.2) 25%,
                    rgba(69,183,209,0.2) 50%,
                    rgba(249,202,36,0.2) 75%,
                    rgba(108,92,231,0.2) 100%
                  )
                `,
                border: '4px solid transparent',
                backdropFilter: 'blur(30px)',
                boxShadow: `0 0 60px rgba(255,107,107,0.3)`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '40px',
                  padding: '4px',
                  background: `
                    linear-gradient(45deg, 
                      #ff6b6b 0%, 
                      #4ecdc4 25%, 
                      #45b7d1 50%, 
                      #f9ca24 75%, 
                      #6c5ce7 100%
                    )
                  `,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  animation: `${holographicShimmer} 4s ease-in-out infinite`,
                  zIndex: -1
                }
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                    fontWeight: 900,
                    background: `
                      linear-gradient(
                        45deg,
                        #ff6b6b 0%,
                        #4ecdc4 20%,
                        #45b7d1 40%,
                        #f9ca24 60%,
                        #6c5ce7 80%,
                        #ff6b6b 100%
                      )
                    `,
                    backgroundSize: '300% 300%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: `${holographicShimmer} 3s ease-in-out infinite`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  🚀 ASCEND TO DIGITAL GODHOOD 🚀
                </Typography>
              </motion.div>

              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600,
                  fontSize: { xs: '1.3rem', md: '1.8rem' },
                  lineHeight: 1.4
                }}
              >
                Join the elite ranks of cyber warriors protected by quantum AI technology.
                <br />
                Your digital awakening begins now.
              </Typography>

              <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotateY: 15, boxShadow: '0 0 80px rgba(255,107,107,1)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<RocketIcon />}
                    component={Link}
                    to="/scanner"
                    sx={{
                      fontSize: '1.8rem',
                      px: 8,
                      py: 4,
                      borderRadius: '35px',
                      background: `
                        linear-gradient(45deg, 
                          #ff6b6b 0%, 
                          #4ecdc4 25%, 
                          #45b7d1 50%, 
                          #f9ca24 75%, 
                          #ff6b6b 100%
                        )
                      `,
                      backgroundSize: '400% 400%',
                      color: 'white',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      boxShadow: `0 0 50px rgba(255,107,107,0.8)`,
                      animation: `${holographicShimmer} 3s ease-in-out infinite`,
                      '&:hover': {
                        animation: `${holographicShimmer} 1s ease-in-out infinite`,
                        boxShadow: `0 0 80px rgba(78,205,196,1)`,
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    BEGIN TRANSFORMATION
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
};

export default HomePage;