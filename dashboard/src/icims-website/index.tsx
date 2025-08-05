import { useState } from 'react';
import { Box } from '@mui/material';

// project components
import Navigation from './components/Navigation';
import HeroSection from './pages/HeroSection';
import StatsSection from './pages/StatsSection';
import AboutSection from './pages/AboutSection';
import ProgramsSection from './pages/ProgramsSection';
import RegistrationSection from './pages/RegistrationSection';
import ContactSection from './pages/ContactSection';
import Footer from './components/Footer';
import RegistrationDialog from './dialogs/RegistrationDialog';
import ContactDialog from './dialogs/ContactDialog';

// ==============================|| ICIMS WEBSITE ||============================== //

export default function IcimsWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationOpen = () => setRegistrationOpen(true);
  const handleRegistrationClose = () => setRegistrationOpen(false);
  const handleContactOpen = () => setContactOpen(true);
  const handleContactClose = () => setContactOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onContactOpen={handleContactOpen}
        onRegistrationOpen={handleRegistrationOpen}
      />
      
      <HeroSection onRegistrationOpen={handleRegistrationOpen} />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <RegistrationSection onRegistrationOpen={handleRegistrationOpen} />
      <ContactSection onContactOpen={handleContactOpen} />
      <Footer />
      
      <RegistrationDialog 
        open={registrationOpen} 
        onClose={handleRegistrationClose} 
      />
      <ContactDialog 
        open={contactOpen} 
        onClose={handleContactClose} 
      />
    </Box>
  );
}
