import { Box, Container, Grid, Stack, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { Book1, Teacher, Award } from 'iconsax-react';

interface RegistrationSectionProps {
  onRegistrationOpen: () => void;
}

export default function RegistrationSection({ onRegistrationOpen }: RegistrationSectionProps) {
  const theme = useTheme();

  return (
    <Box id="register" sx={{ py: 8, bgcolor: 'primary.lighter' }}>
      <Container maxWidth="md">
        <MainCard>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h3" color="primary">Join ICIMS Today</Typography>
            <Typography variant="body1" textAlign="center">
              Take the first step towards quality Islamic education. Register now for the upcoming academic year.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Book1 size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Primary Level</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Ages 7-12 years
                    </Typography>
                    <Button variant="contained" fullWidth onClick={onRegistrationOpen}>
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Teacher size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Secondary Level</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Ages 13-17 years
                    </Typography>
                    <Button variant="contained" fullWidth onClick={onRegistrationOpen}>
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Award size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tuition Classes</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      SPM & STPM Prep
                    </Typography>
                    <Button variant="contained" fullWidth onClick={onRegistrationOpen}>
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </MainCard>
      </Container>
    </Box>
  );
}
