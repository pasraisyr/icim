import { Box, Container, Stack, Typography, Button } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 4, bgcolor: 'primary.main', color: 'white' }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">
            © 2024 ICIMS. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" size="small">Privacy Policy</Button>
            <Button color="inherit" size="small">Terms of Service</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
