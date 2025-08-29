import { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { About, fetchAbouts } from 'icim-portal-element/admin-dashboard/pages/AboutSetup/api';

export default function AboutSection() {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    fetchAbouts().then(setAbouts).catch(console.error);
  }, []);

  const aboutStory = abouts.find(a => a.id === 1);
  const aboutMission = abouts.find(a => a.id === 2);
  const aboutVision = abouts.find(a => a.id === 3);

  return (
    <>
      {/* Our Story */}
      <Box id="our-story" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h3" color="primary">{aboutStory?.title || 'Tentang Kelab Insan Cemerlang'}</Typography>
              <Typography variant="body1" textAlign="center" maxWidth="800px">
                {aboutStory?.description || ''}
              </Typography>
            </Stack>
          </MainCard>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Box id="mission-vision" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MainCard title={aboutMission?.title || 'Misi Kami'}>
                <Typography variant="body1">
                  {aboutMission?.description || ''}
                </Typography>
              </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MainCard title={aboutVision?.title || 'Visi Kami'}>
                <Typography variant="body1">
                  {aboutVision?.description || ''}
                </Typography>
              </MainCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}