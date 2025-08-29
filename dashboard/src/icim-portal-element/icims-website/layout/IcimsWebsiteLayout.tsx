import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// project components
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationDialog from '../dialogs/RegistrationDialog';
import ContactDialog from '../dialogs/ContactDialog';

// types
import { IcimsWebsiteLayoutProps } from '../types';

// utilities
import { scrollToSection as scrollToSectionUtil } from '../utils';

// ==============================|| ICIMS WEBSITE LAYOUT ||============================== //

export default function IcimsWebsiteLayout({ children }: IcimsWebsiteLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSectionUtil(sectionId);
  };

  const handleRegistrationOpen = () => setRegistrationOpen(true);
  const handleRegistrationClose = () => setRegistrationOpen(false);
  const handleContactOpen = () => setContactOpen(true);
  const handleContactClose = () => setContactOpen(false);

  // Listen for custom events from child components
  useEffect(() => {
    const handleOpenRegistration = () => setRegistrationOpen(true);
    const handleOpenContact = () => setContactOpen(true);

    window.addEventListener('openRegistration', handleOpenRegistration);
    window.addEventListener('openContact', handleOpenContact);

    return () => {
      window.removeEventListener('openRegistration', handleOpenRegistration);
      window.removeEventListener('openContact', handleOpenContact);
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onContactOpen={handleContactOpen}
        onRegistrationOpen={handleRegistrationOpen}
      />
      
      {children}
      
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
