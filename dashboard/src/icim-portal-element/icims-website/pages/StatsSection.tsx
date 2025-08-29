import { Container, Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Profile2User, Teacher, Award, Building4 } from 'iconsax-react';

export default function StatsSection() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Profile2User size={40} color={theme.palette.primary.main} />
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>1200+</Typography>
              <Typography variant="body2" color="textSecondary">Active Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Teacher size={40} color={theme.palette.primary.main} />
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>80+</Typography>
              <Typography variant="body2" color="textSecondary">Qualified Teachers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Award size={40} color={theme.palette.primary.main} />
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>95%</Typography>
              <Typography variant="body2" color="textSecondary">Success Rate</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Building4 size={40} color={theme.palette.primary.main} />
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>15</Typography>
              <Typography variant="body2" color="textSecondary">Years Experience</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
