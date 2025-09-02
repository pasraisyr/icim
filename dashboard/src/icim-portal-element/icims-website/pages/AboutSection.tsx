import { useEffect, useState } from 'react';
import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { About, fetchAbouts } from 'icim-portal-element/admin-dashboard/pages/AboutSetup/api';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const icons = [<EmojiObjectsOutlinedIcon fontSize="large" color="primary" />, <StarOutlineOutlinedIcon fontSize="large" color="primary" />];

export default function AboutSection() {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    fetchAbouts()
      .then((data: About[]) => setAbouts(data))
      .catch(console.error);
  }, []);

  const [first, ...rest] = abouts;

  return (
    <Box id="our-story" sx={{ py: 6, bgcolor: '#f5f7fb' }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {first && (
            <MainCard
              sx={{
                p: 4,
                bgcolor: 'white',
                boxShadow: 3,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 12,
                  bgcolor: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  opacity: 0.15,
                }}
              />
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight={700}
                  sx={{
                    textShadow: '0 2px 8px rgba(33,150,243,0.15)',
                    letterSpacing: 1,
                  }}
                >
                  {first.title || 'Tentang Kelab Insan Cemerlang'}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                textAlign="center"
                maxWidth="800px"
                sx={{
                  mx: 'auto',
                  color: 'text.secondary',
                  fontSize: 18,
                  mt: 2,
                }}
              >
                {first.description || ''}
              </Typography>
            </MainCard>
          )}
          {rest.length > 0 && (
            <Grid container spacing={4}>
              {rest.map((about, idx) => (
                <Grid item xs={12} md={6} key={about.id}>
                  <MainCard
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: 'white',
                      borderRadius: 3,
                      boxShadow: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.02)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      {icons[idx % icons.length]}
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={700}
                        gutterBottom
                        sx={{ ml: 1, letterSpacing: 0.5 }}
                      >
                        {about.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {about.description}
                    </Typography>
                  </MainCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}