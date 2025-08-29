import { Box, Container, Grid, Stack, Typography, Button, useTheme, alpha } from '@mui/material';
import { Building4 } from 'iconsax-react';
import BannerIcim from 'assets/images/BannerIcim.jpg';

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
    <Box id="home" sx={{ position: 'relative', py: 8, bgcolor: 'primary.lighter' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Selamat Datang ke Kelab Insan Cemerlang
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Pusat Tuisyen Islam Terbaik untuk Anak-Anak Anda
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Menyediakan pendidikan yang berkualiti dengan kaedah pengajaran moden.
                Membentuk minda muda dengan nilai Islam dan kecemerlangan akademik selama lebih 15 tahun.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={onRegistrationOpen}
                >
                  Mohon Sekarang
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={scrollToAbout}
                >
                  Ketahui Lebih Lanjut
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={BannerIcim}
                alt="Pusat Tuisyen Insan Cemerlang"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  margin: '0 auto',
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
