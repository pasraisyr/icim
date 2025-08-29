import { Box, Container, Grid, Stack, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { Book1, Teacher, Award } from 'iconsax-react';
import { useState } from 'react';
import { ClassesListDialog } from './ClassesListPage';

interface ClassesSectionProps {
  onRegistrationOpen: () => void;
}


export default function ClassesSection({ onRegistrationOpen }: ClassesSectionProps) {
  const theme = useTheme();
  const [classesDialogOpen, setClassesDialogOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleOpenClassesDialog = (level: string) => {
    setSelectedLevel(level);
    setClassesDialogOpen(true);
  };
  const handleCloseClassesDialog = () => {
    setClassesDialogOpen(false);
    setSelectedLevel(null);
  };

  return (
    <Box id="classes-section" sx={{ py: 8, bgcolor: 'primary.lighter' }}>
      <Container maxWidth="md">
        <MainCard>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h3" color="primary">Sertai ICIMS Hari Ini</Typography>
            <Typography variant="body1" textAlign="center">
              Ambil langkah pertama ke arah pendidikan yang berkualiti. Daftar sekarang untuk tahun akademik akan datang.
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Book1 size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tahap Rendah</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Umur 7-12 tahun
                    </Typography>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => handleOpenClassesDialog('Tahap Rendah')}>
                      Lihat Kelas
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Teacher size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tahap Menengah</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Umur 13-17 tahun
                    </Typography>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => handleOpenClassesDialog('Tahap Menengah')}>
                      Lihat Kelas
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <CardContent>
                    <Award size={40} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Kelas Tuisyen</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Persediaan SPM & STPM
                    </Typography>
                    <Button variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => handleOpenClassesDialog('Kelas Tuisyen')}>
                      Lihat Kelas
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={onRegistrationOpen}>
              Mohon Sekarang
            </Button>
            <ClassesListDialog open={classesDialogOpen} onClose={handleCloseClassesDialog} level={selectedLevel} />
          </Stack>
        </MainCard>
      </Container>
    </Box>
  );
}
