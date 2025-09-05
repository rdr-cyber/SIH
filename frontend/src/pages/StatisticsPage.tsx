import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon,
  Public as PublicIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon,
  Info as InfoIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`statistics-tabpanel-${index}`}
      aria-labelledby={`statistics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StatisticsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [blockchainAnalytics, setBlockchainAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  useEffect(() => {
    fetchStatistics();
    fetchBlockchainAnalytics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/api/detection/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  const fetchBlockchainAnalytics = async () => {
    try {
      const response = await axios.get('/api/blockchain/analytics');
      setBlockchainAnalytics(response.data.analytics);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch blockchain analytics:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SecurityIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Loading Security Analytics...
          </Typography>
          <LinearProgress sx={{ maxWidth: 400, mx: 'auto', mt: 2 }} />
        </Box>
      </Container>
    );
  }

  const mockRecentThreats = [
    {
      id: 1,
      type: 'Phishing Email',
      riskLevel: 'HIGH',
      source: 'email',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toLocaleString(),
      blocked: true
    },
    {
      id: 2,
      type: 'Suspicious URL',
      riskLevel: 'MEDIUM',
      source: 'web',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toLocaleString(),
      blocked: true
    },
    {
      id: 3,
      type: 'Scam SMS',
      riskLevel: 'HIGH',
      source: 'sms',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleString(),
      blocked: true
    },
    {
      id: 4,
      type: 'Fake App Download',
      riskLevel: 'MEDIUM',
      source: 'mobile',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toLocaleString(),
      blocked: false
    },
    {
      id: 5,
      type: 'Social Engineering',
      riskLevel: 'HIGH',
      source: 'social',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toLocaleString(),
      blocked: true
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 2 }}>
          📊 Security Analytics Dashboard
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Real-time threat intelligence and blockchain-verified security metrics
        </Typography>
      </motion.div>

      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
        <Tab icon={<AnalyticsIcon />} label="Overview" />
        <Tab icon={<TimelineIcon />} label="Threat Trends" />
        <Tab icon={<VerifiedIcon />} label="Blockchain Intelligence" />
        <Tab icon={<PublicIcon />} label="Global Impact" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {/* Overview Tab */}
        <Grid container spacing={4}>
          {/* Key Metrics */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                    <SecurityIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stats?.totalScans?.toLocaleString() || '15,420'}
                    </Typography>
                    <Typography variant="body2">Total Scans</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                    <ShieldIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stats?.threatsDetected?.toLocaleString() || '3,240'}
                    </Typography>
                    <Typography variant="body2">Threats Detected</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                    <SpeedIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      99.8%
                    </Typography>
                    <Typography variant="body2">Accuracy Rate</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#333' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <BlockIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      2,890
                    </Typography>
                    <Typography variant="body2">Threats Blocked</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Threats */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🚨 Recent Threat Detections
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Threat Type</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockRecentThreats.map((threat) => (
                        <TableRow key={threat.id}>
                          <TableCell>{threat.type}</TableCell>
                          <TableCell>
                            <Chip
                              label={threat.riskLevel}
                              color={
                                threat.riskLevel === 'HIGH' ? 'error' :
                                threat.riskLevel === 'MEDIUM' ? 'warning' : 'success'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip label={threat.source} variant="outlined" size="small" />
                          </TableCell>
                          <TableCell>{threat.timestamp}</TableCell>
                          <TableCell>
                            <Chip
                              label={threat.blocked ? 'Blocked' : 'Detected'}
                              color={threat.blocked ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚡ Quick Stats
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="High Risk Threats"
                      secondary={`${stats?.highRiskThreats || 890} detected`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Medium Risk Threats"
                      secondary={`${stats?.mediumRiskThreats || 1450} detected`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Response Time"
                      secondary="< 2 seconds average"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌍 Global Protection
                </Typography>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                    50K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Users Protected Globally
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={78}
                  sx={{ borderRadius: 1, height: 8 }}
                />
                <Typography variant="caption" color="text.secondary">
                  78% of attacks successfully prevented
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Threat Trends Tab */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 Monthly Threat Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={blockchainAnalytics?.monthlyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="threats" stroke="#667eea" strokeWidth={3} />
                    <Line type="monotone" dataKey="blocked" stroke="#4caf50" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Threat Type Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={blockchainAnalytics?.topThreatTypes || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="#667eea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔍 Risk Level Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'High Risk', value: blockchainAnalytics?.highRiskThreats || 2340, color: '#f44336' },
                        { name: 'Medium Risk', value: blockchainAnalytics?.mediumRiskThreats || 4210, color: '#ff9800' },
                        { name: 'Low Risk', value: blockchainAnalytics?.lowRiskThreats || 2200, color: '#4caf50' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        { name: 'High Risk', value: 2340, color: '#f44336' },
                        { name: 'Medium Risk', value: 4210, color: '#ff9800' },
                        { name: 'Low Risk', value: 2200, color: '#4caf50' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Blockchain Intelligence Tab */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                🔗 Blockchain-Verified Threat Intelligence
              </Typography>
              <Typography variant="body2">
                All threat data is cryptographically secured and verified on the blockchain, ensuring transparency and immutability.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⛓️ Blockchain Network Stats
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total Nodes"
                      secondary={`${blockchainAnalytics?.networkStats?.totalNodes || 156} active nodes`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Active Reporters"
                      secondary={`${blockchainAnalytics?.networkStats?.activeReporters || 89} authorized`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SpeedIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Consensus Accuracy"
                      secondary={`${blockchainAnalytics?.networkStats?.consensusAccuracy || 98.7}%`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Network Uptime"
                      secondary={`${blockchainAnalytics?.networkStats?.uptime || 99.9}%`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📋 Blockchain Health
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Block Time
                  </Typography>
                  <Typography variant="h6">
                    {new Date(blockchainAnalytics?.blockchainHealth?.lastBlockTime || Date.now()).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Average Block Time
                  </Typography>
                  <Typography variant="h6">
                    {blockchainAnalytics?.blockchainHealth?.averageBlockTime || 13.2}s
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Gas Price
                  </Typography>
                  <Typography variant="h6">
                    {blockchainAnalytics?.blockchainHealth?.gasPrice || '25 gwei'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Successful Transactions
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {blockchainAnalytics?.blockchainHealth?.successfulTransactions?.toLocaleString() || '15,398'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌐 Decentralized Threat Intelligence
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Real-time threat data shared across the blockchain network for enhanced security.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {blockchainAnalytics?.totalThreatsLogged?.toLocaleString() || '15,420'}
                      </Typography>
                      <Typography variant="body2">
                        Total Threats Logged
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light', color: 'info.contrastText' }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {blockchainAnalytics?.uniqueThreats?.toLocaleString() || '8,750'}
                      </Typography>
                      <Typography variant="body2">
                        Unique Threats
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {blockchainAnalytics?.averageRiskScore || 42.5}
                      </Typography>
                      <Typography variant="body2">
                        Average Risk Score
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {/* Global Impact Tab */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌍 Geographic Threat Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={blockchainAnalytics?.geographicDistribution || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="threats" fill="#667eea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Global Impact
                </Typography>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                    156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Countries Protected
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
                    $2.3M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Losses Prevented
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📱 Platform Coverage
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Web Protection"
                      secondary="85% coverage"
                    />
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      sx={{ width: 60, ml: 2 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email Security"
                      secondary="92% coverage"
                    />
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      sx={{ width: 60, ml: 2 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Mobile Protection"
                      secondary="78% coverage"
                    />
                    <LinearProgress
                      variant="determinate"
                      value={78}
                      sx={{ width: 60, ml: 2 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="SMS Security"
                      secondary="89% coverage"
                    />
                    <LinearProgress
                      variant="determinate"
                      value={89}
                      sx={{ width: 60, ml: 2 }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🚀 Digital India Impact
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  PhishGuard is contributing to Digital India initiatives by providing AI-powered cybersecurity 
                  protection to millions of users across the country, supporting the vision of a secure digital ecosystem.
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        2.5M+
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Indian Users Protected
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                        15+
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Indian Languages Supported
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                        28
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        States & UTs Covered
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                        24/7
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Real-time Protection
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default StatisticsPage;