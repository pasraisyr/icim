import { Box } from '@mui/material';

// project components
import HeroSection from './pages/HeroSection';
import StatsSection from './pages/StatsSection';
import AboutSection from './pages/AboutSection';
import ProgramsSection from './pages/ProgramsSection';
import RegistrationSection from './pages/RegistrationSection';
import ContactSection from './pages/ContactSection';

// utilities
import { triggerRegistrationDialog, triggerContactDialog } from './utils';

// ==============================|| ICIMS WEBSITE ||============================== //

export default function IcimsWebsite() {
  return (
    <Box>
      <HeroSection onRegistrationOpen={triggerRegistrationDialog} />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <RegistrationSection onRegistrationOpen={triggerRegistrationDialog} />
      <ContactSection onContactOpen={triggerContactDialog} />
    </Box>
  );
}
