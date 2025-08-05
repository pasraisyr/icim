import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Stack, 
  Card, 
  CardContent, 
  Box,
  Menu,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { 
  Home, 
  InfoCircle, 
  Call, 
  UserAdd, 
  Book1, 
  Teacher, 
  Award,
  Profile2User,
  Building4,
  ArrowDown2
} from 'iconsax-react';

// ==============================|| ICIMS WEBSITE ||============================== //

export default function IcimsWebsite() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [aboutAnchor, setAboutAnchor] = useState<null | HTMLElement>(null);
  const [programsAnchor, setProgramsAnchor] = useState<null | HTMLElement>(null);
  const [admissionsAnchor, setAdmissionsAnchor] = useState<null | HTMLElement>(null);

  const handleAboutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAboutAnchor(event.currentTarget);
  };

  const handleProgramsClick = (event: React.MouseEvent<HTMLElement>) => {
    setProgramsAnchor(event.currentTarget);
  };

  const handleAdmissionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAdmissionsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAboutAnchor(null);
    setProgramsAnchor(null);
    setAdmissionsAnchor(null);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Custom Navigation Bar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary',
          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
        }}
      >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <Building4 size={32} color={theme.palette.primary.main} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ICIMS
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={3}>
            <Button 
              color="inherit" 
              onClick={() => scrollToSection('home')}
              sx={{ color: activeSection === 'home' ? 'primary.main' : 'text.primary' }}
            >
              Home
            </Button>
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleAboutClick}
              sx={{ color: 'text.primary' }}
            >
              About Us
            </Button>
            <Menu
              anchorEl={aboutAnchor}
              open={Boolean(aboutAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => scrollToSection('our-story')}>Our Story</MenuItem>
              <MenuItem onClick={() => scrollToSection('mission-vision')}>Mission & Vision</MenuItem>
              <MenuItem onClick={() => scrollToSection('faculty')}>Our Faculty</MenuItem>
              <MenuItem onClick={() => scrollToSection('achievements')}>Achievements</MenuItem>
            </Menu>
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleProgramsClick}
              sx={{ color: 'text.primary' }}
            >
              Programs
            </Button>
            <Menu
              anchorEl={programsAnchor}
              open={Boolean(programsAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => scrollToSection('primary-education')}>Primary Education</MenuItem>
              <MenuItem onClick={() => scrollToSection('secondary-education')}>Secondary Education</MenuItem>
              <MenuItem onClick={() => scrollToSection('tuition-classes')}>Tuition Classes</MenuItem>
              <MenuItem onClick={() => scrollToSection('extracurricular')}>Extracurricular</MenuItem>
            </Menu>
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleAdmissionsClick}
              sx={{ color: 'text.primary' }}
            >
              Admissions
            </Button>
            <Menu
              anchorEl={admissionsAnchor}
              open={Boolean(admissionsAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => scrollToSection('admission-process')}>Admission Process</MenuItem>
              <MenuItem onClick={() => scrollToSection('requirements')}>Requirements</MenuItem>
              <MenuItem onClick={() => scrollToSection('fees')}>Fees Structure</MenuItem>
            </Menu>
            
            <Button 
              color="inherit" 
              onClick={() => scrollToSection('contact')}
              sx={{ color: activeSection === 'contact' ? 'primary.main' : 'text.primary' }}
            >
              Contact
            </Button>
            
            <Button 
              variant="contained" 
              startIcon={<UserAdd />}
              onClick={() => navigate('/student-registration')}
              sx={{ ml: 2 }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box id="home" sx={{ py: 8, bgcolor: 'primary.lighter' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Welcome to ICIMS
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Islamic Comprehensive Integrated Management System
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  Providing quality Islamic education with modern teaching methods. 
                  Nurturing young minds with Islamic values and academic excellence for over 15 years.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/student-registration')}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => scrollToSection('our-story')}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Building4 size={300} color={alpha(theme.palette.primary.main, 0.3)} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Profile2User size={40} color={theme.palette.primary.main} />
                <Typography variant="h4" color="primary" sx={{ mt: 1 }}>1200+</Typography>
                <Typography variant="body2" color="textSecondary">Active Students</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Teacher size={40} color={theme.palette.primary.main} />
                <Typography variant="h4" color="primary" sx={{ mt: 1 }}>80+</Typography>
                <Typography variant="body2" color="textSecondary">Qualified Teachers</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Award size={40} color={theme.palette.primary.main} />
                <Typography variant="h4" color="primary" sx={{ mt: 1 }}>95%</Typography>
                <Typography variant="body2" color="textSecondary">Success Rate</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Building4 size={40} color={theme.palette.primary.main} />
                <Typography variant="h4" color="primary" sx={{ mt: 1 }}>15</Typography>
                <Typography variant="body2" color="textSecondary">Years Experience</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About Us Sections */}
      <Box id="our-story" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h3" color="primary">Our Story</Typography>
              <Typography variant="body1" textAlign="center" maxWidth="800px">
                Established in 2009, ICIMS began as a small Islamic school with a vision to provide 
                comprehensive education rooted in Islamic values. Today, we are proud to be one of 
                Malaysia's leading Islamic educational institutions, serving over 1200 students.
              </Typography>
            </Stack>
          </MainCard>
        </Container>
      </Box>

      <Box id="mission-vision" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MainCard title="Our Mission">
                <Typography variant="body1">
                  To provide quality Islamic education that combines traditional Islamic teachings 
                  with modern educational approaches, preparing students to excel in both worldly 
                  and spiritual dimensions of life.
                </Typography>
              </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MainCard title="Our Vision">
                <Typography variant="body1">
                  To be the leading Islamic educational institution that produces knowledgeable, 
                  skilled, and morally upright individuals who contribute positively to society 
                  while maintaining strong Islamic values.
                </Typography>
              </MainCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Programs Sections */}
      <Box id="primary-education" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Primary Education">
            <Typography variant="body1">
              Our primary education program focuses on building strong foundations in Islamic studies, 
              Arabic language, and core academic subjects through interactive and engaging methods.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Registration Section */}
      <Box id="register" sx={{ py: 8, bgcolor: 'primary.lighter' }}>
        <Container maxWidth="md">
          <MainCard>
            <Stack spacing={4} alignItems="center">
              <Typography variant="h3" color="primary">Register Now</Typography>
              <Typography variant="body1" textAlign="center">
                Join our community of learners and start your journey towards academic and spiritual excellence.
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <CardContent>
                      <Book1 size={40} color={theme.palette.primary.main} />
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Primary Level</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Ages 7-12 years
                      </Typography>
                      <Button variant="contained" fullWidth onClick={() => navigate('/student-registration')}>
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <CardContent>
                      <Teacher size={40} color={theme.palette.primary.main} />
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Secondary Level</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Ages 13-17 years
                      </Typography>
                      <Button variant="contained" fullWidth onClick={() => navigate('/student-registration')}>
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <CardContent>
                      <Award size={40} color={theme.palette.primary.main} />
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tuition Classes</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        SPM & STPM Prep
                      </Typography>
                      <Button variant="contained" fullWidth onClick={() => navigate('/student-registration')}>
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <MainCard title="Contact Us">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2} alignItems="center">
                  <Call size={40} color={theme.palette.primary.main} />
                  <Typography variant="h6">Phone</Typography>
                  <Typography variant="body2" textAlign="center">
                    +60 3-1234 5678<br />
                    +60 12-345 6789
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={2} alignItems="center">
                  <Building4 size={40} color={theme.palette.primary.main} />
                  <Typography variant="h6">Address</Typography>
                  <Typography variant="body2" textAlign="center">
                    123 Jalan Pendidikan<br />
                    Kuala Lumpur, Malaysia
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={2} alignItems="center">
                  <InfoCircle size={40} color={theme.palette.primary.main} />
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body2" textAlign="center">
                    info@icims.edu.my<br />
                    admissions@icims.edu.my
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">
              © 2024 ICIMS. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" size="small">Privacy Policy</Button>
              <Button color="inherit" size="small">Terms of Service</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
