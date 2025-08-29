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
import { ArrowDown2, UserAdd } from 'iconsax-react';
import icimLogo from 'assets/images/logo-icim.jpg';


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
  const [programsAnchor, setProgramsAnchor] = useState<null | HTMLElement>(null);
  const [admissionsAnchor, setAdmissionsAnchor] = useState<null | HTMLElement>(null);


  const handleProgramsClick = (event: React.MouseEvent<HTMLElement>) => {
    setProgramsAnchor(event.currentTarget);
  };


  const handleClose = () => {
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
            <img
              src={icimLogo}
              alt="Logo ICIMS"
              style={{ height: 32, width: 'auto', display: 'block' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
             Kelab Insan Cemerlang Melaka
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={3}>
            <Button 
              color="inherit" 
              onClick={() => scrollToSection('home')}
              sx={{ color: activeSection === 'home' ? 'primary.main' : 'text.primary' }}
            >
              Halaman Utama
            </Button>
            
            <Button 
              color="inherit"
              onClick={() => scrollToSection('our-story')}
              sx={{ color: 'text.primary' }}
            >
              Tentang
            </Button>
            
            <Button 
              color="inherit" 
              endIcon={<ArrowDown2 size={16} />}
              onClick={handleProgramsClick}
              sx={{ color: 'text.primary' }}
            >
              Kelas
            </Button>
            
           
            
            <Button 
              color="inherit" 
              onClick={onContactOpen}
              sx={{ color: 'text.primary' }}
            >
              Hubungi
            </Button>
            
            <Button 
              color="inherit" 
              onClick={() => window.location.href = 'http://localhost:3000/react/login'}
              sx={{ color: 'text.primary' }}
            >
              Log Masuk
            </Button>
            
            <Button 
              variant="contained" 
              startIcon={<UserAdd />}
              onClick={onRegistrationOpen}
              sx={{ ml: 2 }}
            >
              Daftar
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>


      
      {/* Programs Menu */}
      <Menu
        anchorEl={programsAnchor}
        open={Boolean(programsAnchor)}
        onClose={handleClose}
      >
  <MenuItem onClick={() => handleMenuItemClick('classes-section')}>Pendidikan Akademik</MenuItem>
  <MenuItem onClick={() => handleMenuItemClick('extracurricular')}>Aktiviti Kokurikulum</MenuItem>
      </Menu>
      
      {/* Admissions Menu */}
      <Menu
        anchorEl={admissionsAnchor}
        open={Boolean(admissionsAnchor)}
        onClose={handleClose}
      >
  <MenuItem onClick={() => handleMenuItemClick('admission-process')}>Proses Kemasukan</MenuItem>
  <MenuItem onClick={() => handleMenuItemClick('requirements')}>Keperluan</MenuItem>
  <MenuItem onClick={() => handleMenuItemClick('fees')}>Struktur Yuran</MenuItem>
      </Menu>
    </>
  );
}
