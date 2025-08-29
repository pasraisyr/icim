import { Box } from '@mui/material';

// project components
import HeroSection from './pages/HeroSection';
// import StatsSection from './pages/StatsSection';
import AboutSection from './pages/AboutSection';
// import ProgramsSection from './pages/ProgramsSection';
import ClassesSection from './pages/ClassesSection';
import ContactSection from './pages/ContactSection';
import ExtracurricularSection from './pages/ExtracurricularSection';

// utilities
import { triggerRegistrationDialog, triggerContactDialog } from './utils';

// ==============================|| ICIMS WEBSITE ||============================== //

export default function IcimsWebsite() {
  return (
    <Box>
      <HeroSection onRegistrationOpen={triggerRegistrationDialog} />
      {/* <StatsSection /> */}
      <AboutSection />
      {/* <ProgramsSection /> */}
      <ClassesSection onRegistrationOpen={triggerRegistrationDialog} />
      <ExtracurricularSection onRegistrationOpen={triggerRegistrationDialog} />
      <ContactSection onContactOpen={triggerContactDialog} />
    </Box>
  );
}
