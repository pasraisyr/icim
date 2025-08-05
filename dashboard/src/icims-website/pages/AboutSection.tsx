import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

export default function AboutSection() {
  return (
    <>
      {/* Our Story */}
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

      {/* Mission & Vision */}
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

      {/* Faculty Section */}
      <Box id="faculty" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Our Faculty">
            <Typography variant="body1">
              Our dedicated team of qualified teachers brings years of experience in both Islamic 
              studies and modern education, ensuring students receive the best of both worlds.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Achievements */}
      <Box id="achievements" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <MainCard title="Our Achievements">
            <Typography variant="body1">
              Over the years, ICIMS has achieved numerous accolades in academic excellence, 
              character development, and community service, making us a trusted name in Islamic education.
            </Typography>
          </MainCard>
        </Container>
      </Box>
    </>
  );
}
