import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Menu as MenuIcon,
  Scanner as ScannerIcon,
  School as SchoolIcon,
  Chat as ChatIcon,
  Analytics as AnalyticsIcon,
  Home as HomeIcon,
  Language as LanguageIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [currentLang, setCurrentLang] = useState('en');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Impact', icon: <TrendingUpIcon />, path: '/impact' },
    { text: 'Scanner', icon: <ScannerIcon />, path: '/scanner' },
    { text: 'Awareness', icon: <SchoolIcon />, path: '/awareness' },
    { text: 'AI Mentor', icon: <ChatIcon />, path: '/chatbot' },
    { text: 'Statistics', icon: <AnalyticsIcon />, path: '/statistics' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLangAnchorEl(null);
  };

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    setLangAnchorEl(null);
    // Here you would implement language switching logic
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <SecurityIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          PhishGuard
        </Typography>
        <Chip 
          label="AI Powered" 
          size="small" 
          color="primary" 
          sx={{ mt: 1 }}
        />
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{
              bgcolor: isActivePage(item.path) ? 'primary.main' : 'transparent',
              color: isActivePage(item.path) ? 'white' : 'inherit',
              '&:hover': {
                bgcolor: isActivePage(item.path) ? 'primary.dark' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: isActivePage(item.path) ? 'white' : 'primary.main' 
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <SecurityIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            PhishGuard
            <Chip 
              label="AI" 
              size="small" 
              sx={{ 
                ml: 1, 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontSize: '0.7rem',
              }} 
            />
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    bgcolor: isActivePage(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    borderRadius: 2,
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton
            color="inherit"
            onClick={handleLanguageClick}
            sx={{ ml: 1 }}
          >
            <LanguageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={langAnchorEl}
        open={Boolean(langAnchorEl)}
        onClose={handleLanguageClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLang === lang.code}
          >
            <Typography sx={{ mr: 1 }}>{lang.flag}</Typography>
            {lang.name}
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;