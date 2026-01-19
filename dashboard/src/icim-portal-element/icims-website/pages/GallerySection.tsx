import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import { fetchGalleries, Gallery } from 'icim-portal-element/admin-dashboard/pages/GalleryManagement/api';

export default function GallerySection() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries()
      .then((data) => {
        // Filter only active galleries
        const activeGalleries = data.filter(g => g.status === true);
        setGalleries(activeGalleries);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || galleries.length === 0) {
    return null; // Don't show section if no galleries
  }

  return (
    <Box id="gallery" sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Stack spacing={6}>
          {/* Section Header */}
          <Box textAlign="center">
            <Typography
              variant="h3"
              color="primary"
              fontWeight={700}
              gutterBottom
              sx={{
                textShadow: '0 2px 8px rgba(33,150,243,0.15)',
                letterSpacing: 1,
              }}
            >
              Galeri Kami
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '600px', mx: 'auto', mt: 2 }}
            >
              Lihat aktiviti-aktiviti menarik yang telah kami jalankan
            </Typography>
          </Box>

          {/* Gallery Grid */}
          <Grid container spacing={3}>
            {galleries.map((gallery) => (
              <Grid item xs={12} sm={6} md={4} key={gallery.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={gallery.image}
                    alt={gallery.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight={600}
                      gutterBottom
                    >
                      {gallery.title}
                    </Typography>
                    {gallery.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                        }}
                      >
                        {gallery.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
