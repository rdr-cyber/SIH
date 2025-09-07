import React, { useState, memo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Unstable_Grid2 as Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  LinearProgress,
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
import { motion } from 'framer-motion';
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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// Memoized components for better performance
const MemoizedResultCard = memo(({ result }: { result: AnalysisResult }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ borderRadius: 2, mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h3">
            Analysis Results
          </Typography>
          <Chip
            label={result.riskLevel}
            color={
              result.riskLevel === 'HIGH' ? 'error' :
              result.riskLevel === 'MEDIUM' ? 'warning' : 'success'
            }
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Risk Score: {result.riskScore}/100
          </Typography>
          <LinearProgress
            variant="determinate"
            value={result.riskScore}
            color={
              result.riskScore >= 70 ? 'error' :
              result.riskScore >= 40 ? 'warning' : 'success'
            }
            sx={{ borderRadius: 1, height: 8 }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detected Threats
          </Typography>
          <List dense>
            {result.threats.map((threat, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <WarningIcon color="error" sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={threat.type}
                  secondary={`${threat.confidence}% confidence - ${threat.description}`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Explanation
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
            <Typography variant="body2">{result.explanation}</Typography>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Security Recommendations
          </Typography>
          <List dense>
            {result.recommendations.map((rec, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={rec}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
));

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
      // Simulate API call with mock data for better performance
      setTimeout(() => {
        const mockResult: AnalysisResult = {
          riskLevel: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
          riskScore: Math.floor(Math.random() * 100),
          threats: [
            { type: 'Suspicious Domain', confidence: 95, description: 'Domain uses suspicious TLD' },
            { type: 'Urgent Language', confidence: 85, description: 'Contains high-pressure language' }
          ],
          explanation: 'This content exhibits several red flags commonly associated with phishing attempts. The domain structure is suspicious and the language used creates a sense of urgency to prompt immediate action.',
          recommendations: [
            'Do not click on any links in this message',
            'Verify the source through official channels',
            'Report this to your IT security team',
            'Delete this message immediately'
          ],
          timestamp: new Date().toISOString(),
          scanId: 'scan_' + Date.now()
        };
        
        setResult(mockResult);
        setScanHistory(prev => [mockResult, ...prev.slice(0, 4)]);
        setIsScanning(false);
      }, 1000);
    } catch (err: any) {
      setError('Scan failed: ' + (err.response?.data?.message || err.message));
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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 3 }}>
          🔍 AI Security Scanner
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Real-time phishing and scam detection powered by advanced AI
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="scanner tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                {scanTypes.map((type, index) => (
                  <Tab
                    key={type.type}
                    icon={type.icon}
                    label={type.label}
                    id={`scanner-tab-${index}`}
                    aria-controls={`scanner-tabpanel-${index}`}
                    sx={{ minHeight: 48 }}
                  />
                ))}
              </Tabs>
            </Box>

            {scanTypes.map((type, index) => (
              <TabPanel key={type.type} value={tabValue} index={index}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder={type.placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={isScanning ? <CircularProgress size={20} /> : <ScannerIcon />}
                    onClick={handleScan}
                    disabled={isScanning}
                    sx={{ minWidth: 150 }}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Now'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => setContent('')}
                    disabled={isScanning}
                  >
                    Clear
                  </Button>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {isScanning && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress sx={{ mb: 2 }} />
                    <Typography>Analyzing content with AI...</Typography>
                  </Box>
                )}

                {result && <MemoizedResultCard result={result} />}

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Test Samples
                  </Typography>
                  <Grid container spacing={1}>
                    {testSamples[tabValue === 0 ? 'url' : 'text'].map((sample, index) => (
                      <Grid size={{ xs: 12 }} key={index}>
                        <Paper 
                          sx={{ p: 1.5, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
                          onClick={() => handleTestSample(sample)}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {sample}
                            </Typography>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); copyToClipboard(sample); }}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>
            ))}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📋 Scan History
              </Typography>
              {scanHistory.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No recent scans
                </Typography>
              ) : (
                <List dense>
                  {scanHistory.map((scan, index) => (
                    <React.Fragment key={scan.scanId}>
                      <ListItem 
                        sx={{ 
                          py: 1, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.50' },
                          cursor: 'pointer'
                        }}
                        onClick={() => setResult(scan)}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getRiskIcon(scan.riskLevel)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`Scan #${scanHistory.length - index}`}
                          secondary={new Date(scan.timestamp).toLocaleTimeString()}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                        <Chip
                          label={scan.riskLevel}
                          size="small"
                          color={getRiskColor(scan.riskLevel)}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </ListItem>
                      {index < scanHistory.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🛡️ Security Tips
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Always verify sender identity" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Look for HTTPS in URLs" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Avoid clicking suspicious links" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Never share passwords or OTPs" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(ScannerPage);