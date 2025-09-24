import { Box, Container, Grid, Stack, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { Class, fetchClasses } from 'icim-portal-element/admin-dashboard/pages/ClassesManagement/api';
import {  Award } from 'iconsax-react';
import { useState, useEffect } from 'react';


interface ExtracurricularSectionProps {
  onRegistrationOpen: () => void;
}


export default function ExtracurricularSection({ onRegistrationOpen }: ExtracurricularSectionProps) {
  const theme = useTheme();
  const [extracurricularClasses, setExtracurricularClasses] = useState<Class[]>([]);

  useEffect(() => {
    fetchClasses().then(classes => {
      setExtracurricularClasses(
        classes.filter(cls => cls.level && cls.level.toLowerCase().includes('aktiviti kokurikulum'))
      );
    }).catch(console.error);
  }, []);

  return (
    <Box id="extracurricular" sx={{ py: 8, bgcolor: 'primary.lighter' }}>
      <Container maxWidth="md">
        <MainCard>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h3" color="primary">Kami Menawarkan Aktiviti Kokurikulum</Typography>
            <Typography variant="body1" textAlign="center">
              Terokai pelbagai aktiviti kokurikulum kami yang direka untuk memperkaya pengalaman pendidikan.
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {extracurricularClasses.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ m: 2 }}>
                  Tiada kelas kokurikulum dijumpai.
                </Typography>
              ) : extracurricularClasses.map(cls => (
                <Grid item xs={12} md={4} key={cls.id}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Award size={40} color={theme.palette.primary.main} />
                        </Box>
                        <Typography variant="h6" color="primary" align="center">{cls.name}</Typography>
                        <Typography variant="subtitle2" color="textSecondary" align="center" sx={{ fontWeight: 500 }}>
                          {cls.level}
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500 }}>
                            Aktiviti:
                          </Typography>
                          {Array.isArray(cls.subjects) ? (
                            <ul style={{ margin: 0, paddingLeft: 18 }}>
                              {cls.subjects.map((sub, idx) => (
                                <li key={idx} style={{ fontSize: '0.95rem', color: theme.palette.text.secondary }}>
                                  {typeof sub === 'string' ? sub : sub.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Typography variant="body2" color="textSecondary">{cls.subjects}</Typography>
                          )}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500 }}>
                            Jadual:
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {cls.scheduleDay}, {cls.startTime} - {cls.endTime}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500 }}>
                            Harga:
                          </Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                            RM{cls.price}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={onRegistrationOpen}>
              Mohon Sekarang
            </Button>
          </Stack>
        </MainCard>
      </Container>
    </Box>
  );
}
