import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Scanner as ScannerIcon,
  Link as LinkIcon,
  Message as MessageIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ContentCopy as ContentCopyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AnalysisResult {
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  riskScore: number;
  threats: Array<{
    type: string;
    confidence: number;
    description: string;
  }>;
  explanation: string;
  recommendations: string[];
  timestamp: string;
  scanId: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scanner-tabpanel-${index}`}
      aria-labelledby={`scanner-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ScannerPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [content, setContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>([]);

  const scanTypes = [
    { label: 'URL', icon: <LinkIcon />, type: 'url', placeholder: 'Enter URL to scan (e.g., https://example.com)' },
    { label: 'Text/SMS', icon: <MessageIcon />, type: 'text', placeholder: 'Paste suspicious text or SMS message here...' },
    { label: 'Email', icon: <EmailIcon />, type: 'email', placeholder: 'Paste email content here...' },
    { label: 'WhatsApp', icon: <PhoneIcon />, type: 'whatsapp', placeholder: 'Paste WhatsApp message here...' },
  ];

  const testSamples = {
    url: [
      'http://paypal-verification.secure-login.tk',
      'https://amazon-update.account-security.ml',
      'http://192.168.1.100/login.php'
    ],
    text: [
      'URGENT: Your account will be suspended! Click here to verify immediately.',
      'Congratulations! You\'ve won $50,000! Click link to claim prize now.',
      'Security Alert: Suspicious activity detected. Confirm identity here.'
    ]
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setContent('');
    setResult(null);
    setError(null);
  };

  const handleScan = async () => {
    if (!content.trim()) {
      setError('Please enter content to scan');
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/api/detection/analyze', {
        content: content.trim(),
        type: scanTypes[tabValue].type,
        language: 'en'
      });

      if (response.data.success) {
        const analysisResult = response.data.analysis;
        setResult(analysisResult);
        setScanHistory(prev => [analysisResult, ...prev.slice(0, 9)]); // Keep last 10 scans
      } else {
        setError('Analysis failed: ' + response.data.error);
      }
    } catch (err: any) {
      setError('Scan failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsScanning(false);
    }
  };

  const handleTestSample = (sample: string) => {
    setContent(sample);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'info';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH': return <ErrorIcon />;
      case 'MEDIUM': return <WarningIcon />;
      case 'LOW': return <CheckCircleIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          🔍 AI Security Scanner
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Real-time phishing and scam detection powered by advanced AI
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="scanner tabs">
                {scanTypes.map((type, index) => (
                  <Tab
                    key={type.type}
                    icon={type.icon}
                    label={type.label}
                    id={`scanner-tab-${index}`}
                    aria-controls={`scanner-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>

            {scanTypes.map((type, index) => (
              <TabPanel key={type.type} value={tabValue} index={index}>
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder={type.placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={isScanning ? <CircularProgress size={20} /> : <ScannerIcon />}
                      onClick={handleScan}
                      disabled={isScanning}
                      size="large"
                      sx={{ minWidth: 150 }}
                    >
                      {isScanning ? 'Scanning...' : 'Scan Now'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={() => {
                        setContent('');
                        setResult(null);
                        setError(null);
                      }}
                    >
                      Clear
                    </Button>
                  </Box>

                  {/* Test Samples */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Try these test samples:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {(tabValue === 0 ? testSamples.url : testSamples.text).map((sample, idx) => (
                        <Chip
                          key={idx}
                          label={`Sample ${idx + 1}`}
                          variant="outlined"
                          onClick={() => handleTestSample(sample)}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}

                  <AnimatePresence>
                    {result && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity={getRiskColor(result.riskLevel) as any}
                          icon={getRiskIcon(result.riskLevel)}
                          sx={{ mb: 3 }}
                        >
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Risk Level: {result.riskLevel}
                          </Typography>
                          <Typography variant="body2">
                            {result.explanation}
                          </Typography>
                        </Alert>

                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Scan Results
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Risk Score: {result.riskScore}/100
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Scan ID: {result.scanId}
                                <IconButton
                                  size="small"
                                  onClick={() => copyToClipboard(result.scanId)}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Typography>
                            </Box>

                            {result.threats.length > 0 && (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                  Detected Threats:
                                </Typography>
                                {result.threats.map((threat, idx) => (
                                  <Chip
                                    key={idx}
                                    label={`${threat.type} (${Math.round(threat.confidence * 100)}%)`}
                                    color={threat.confidence > 0.7 ? 'error' : 'warning'}
                                    size="small"
                                    sx={{ mr: 1, mb: 1 }}
                                  />
                                ))}
                              </Box>
                            )}

                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                              Recommendations:
                            </Typography>
                            <List dense>
                              {result.recommendations.map((rec, idx) => (
                                <ListItem key={idx}>
                                  <ListItemIcon>
                                    <CheckCircleIcon color="primary" fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={rec} />
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </TabPanel>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Scan Statistics
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                  {scanHistory.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scans Performed
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="error.main">
                    {scanHistory.filter(s => s.riskLevel === 'HIGH').length}
                  </Typography>
                  <Typography variant="caption">High Risk</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">
                    {scanHistory.filter(s => s.riskLevel === 'MEDIUM').length}
                  </Typography>
                  <Typography variant="caption">Medium Risk</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">
                    {scanHistory.filter(s => s.riskLevel === 'LOW').length}
                  </Typography>
                  <Typography variant="caption">Low Risk</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {scanHistory.length > 0 && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📝 Recent Scans
                </Typography>
                <List>
                  {scanHistory.slice(0, 5).map((scan, idx) => (
                    <React.Fragment key={scan.scanId}>
                      <ListItem>
                        <ListItemIcon>
                          {getRiskIcon(scan.riskLevel)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Chip
                              label={scan.riskLevel}
                              color={getRiskColor(scan.riskLevel) as any}
                              size="small"
                            />
                          }
                          secondary={new Date(scan.timestamp).toLocaleTimeString()}
                        />
                      </ListItem>
                      {idx < scanHistory.slice(0, 5).length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScannerPage;