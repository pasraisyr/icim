import { Box, Container, Grid, Stack, Typography, Button, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { Call, Building4, Sms, Send } from 'iconsax-react';

interface ContactSectionProps {
  onContactOpen: () => void;
}

export default function ContactSection({ onContactOpen }: ContactSectionProps) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <MainCard title="Contact Information">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <Call size={40} color={theme.palette.primary.main} />
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body2" textAlign="center">
                  +60 3-1234 5678<br />
                  +60 12-345 6789
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <Building4 size={40} color={theme.palette.primary.main} />
                <Typography variant="h6">Address</Typography>
                <Typography variant="body2" textAlign="center">
                  123 Jalan Pendidikan<br />
                  Kuala Lumpur, Malaysia
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <Sms size={40} color={theme.palette.primary.main} />
                <Typography variant="h6">Email</Typography>
                <Typography variant="body2" textAlign="center">
                  info@icims.edu.my<br />
                  admissions@icims.edu.my
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" onClick={onContactOpen} startIcon={<Send />}>
              Send us a Message
            </Button>
          </Box>
        </MainCard>
      </Container>
    </Box>
  );
}
