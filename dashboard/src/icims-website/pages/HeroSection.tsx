import { Box, Container, Grid, Stack, Typography, Button, useTheme, alpha } from '@mui/material';
import { Building4 } from 'iconsax-react';

interface HeroSectionProps {
  onRegistrationOpen: () => void;
}

export default function HeroSection({ onRegistrationOpen }: HeroSectionProps) {
  const theme = useTheme();

  const scrollToAbout = () => {
    const element = document.getElementById('our-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
                  onClick={onRegistrationOpen}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={scrollToAbout}
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
  );
}
