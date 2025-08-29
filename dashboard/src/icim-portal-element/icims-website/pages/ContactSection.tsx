import { Box, Container, Grid, Stack, Typography, Button, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { Call, Building4, Sms, Send } from 'iconsax-react';
import FacebookIcon from '@mui/icons-material/Facebook';

interface ContactSectionProps {
  onContactOpen: () => void;
}

export default function ContactSection({ onContactOpen }: ContactSectionProps) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <MainCard title="Maklumat Hubungan">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <Call size={40} color={theme.palette.primary.main} />
                <Typography variant="h6">Telefon</Typography>
                <Typography variant="body2" textAlign="center">
                  01129389554 (Admin)<br />
                  01155036025 (Ustaz Zainy)
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <Building4 size={40} color={theme.palette.primary.main} />
                <Typography variant="h6">Alamat</Typography>
                <Typography variant="body2" textAlign="center">
                  No 44, Jalan Komersil IAN 1,<br />
                  Industri Angkasa Nuri,<br />
                  76100, Durian Tunggal, Melaka
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2} alignItems="center">
                <FacebookIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                <Typography variant="h6">Facebook</Typography>
                <Typography variant="body2" textAlign="center">
                  <a href="https://www.facebook.com/share/1BBwpVwupz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    facebook.com/icims.edu.my
                  </a>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <a
              href="https://wa.me/601129389554?text=Hello%20ICIMS%20Admin,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran."
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained" startIcon={<Send />}>
                Hantar Mesej kepada Kami
              </Button>
            </a>
          </Box>
        </MainCard>
      </Container>
    </Box>
  );
}
