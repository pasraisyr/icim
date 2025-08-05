import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack,
  Menu,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';
import { Building4, ArrowDown2, UserAdd } from 'iconsax-react';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  onContactOpen: () => void;
  onRegistrationOpen: () => void;
}

export default function Navigation({ 
  activeSection, 
  scrollToSection, 
  onContactOpen, 
  onRegistrationOpen 
}: NavigationProps) {
  const theme = useTheme();
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

  const handleMenuItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    handleClose();
  };

  return (
    <>
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
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleProgramsClick}
              sx={{ color: 'text.primary' }}
            >
              Programs
            </Button>
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleAdmissionsClick}
              sx={{ color: 'text.primary' }}
            >
              Admissions
            </Button>
            
            <Button 
              color="inherit" 
              onClick={onContactOpen}
              sx={{ color: 'text.primary' }}
            >
              Contact
            </Button>
            
            <Button 
              variant="contained" 
              startIcon={<UserAdd />}
              onClick={onRegistrationOpen}
              sx={{ ml: 2 }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* About Menu */}
      <Menu
        anchorEl={aboutAnchor}
        open={Boolean(aboutAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('our-story')}>Our Story</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('mission-vision')}>Mission & Vision</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('faculty')}>Our Faculty</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('achievements')}>Achievements</MenuItem>
      </Menu>
      
      {/* Programs Menu */}
      <Menu
        anchorEl={programsAnchor}
        open={Boolean(programsAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('primary-education')}>Primary Education</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('secondary-education')}>Secondary Education</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('tuition-classes')}>Tuition Classes</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('extracurricular')}>Extracurricular</MenuItem>
      </Menu>
      
      {/* Admissions Menu */}
      <Menu
        anchorEl={admissionsAnchor}
        open={Boolean(admissionsAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('admission-process')}>Admission Process</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('requirements')}>Requirements</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('fees')}>Fees Structure</MenuItem>
      </Menu>
    </>
  );
}
