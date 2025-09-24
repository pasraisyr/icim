import { useState, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Book, Calendar, Profile2User } from 'iconsax-react';

// local imports
import attendanceAPI, { ClassInfo } from './api';

type ClassData = {
  id: number;
  name: string;
  level: string;
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: string;
  status: string;
  subjects: string[];
  students_count: number;
};

const TeacherClasses = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsStudents, setDetailsStudents] = useState<string[]>([]);
  const [detailsClass, setDetailsClass] = useState<ClassData | null>(null);

  // Fetch classes for the logged-in teacher on mount
  useEffect(() => {
    fetchTeacherClasses();
    // eslint-disable-next-line
  }, []);

  const fetchTeacherClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const classList = await attendanceAPI.getTeacherClasses();
      // Fetch details for each class
      const detailedClasses = await Promise.all(
        classList.map(async (c) => {
          try {
            const detail = await attendanceAPI.getTeacherClassDetail(c.id);
            return detail;
          } catch {
            // fallback to basic info if detail fails
            return {
              ...c,
              scheduleDay: '',
              startTime: '',
              endTime: '',
              price: '',
              status: '',
              subjects: [],
              students_count: 0,
            };
          }
        })
      );
      setClasses(detailedClasses);
    } catch (error) {
      setError('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (classId: number) => {
    setDetailsOpen(true);
    setDetailsLoading(true);
    try {
      const classDetail: ClassInfo = await attendanceAPI.getTeacherClassDetail(classId);
      setDetailsClass(classDetail);
      const students = await attendanceAPI.getStudentsInClass(classId);
      setDetailsStudents(students.map((s: any) => s.studentName || s.name));
    } catch (err) {
      setDetailsClass(null);
      setDetailsStudents([]);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setDetailsStudents([]);
    setDetailsClass(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'info';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatScheduleDay = (day: string[] | string | undefined | null) => {
    if (Array.isArray(day)) return day.join(' ');
    if (typeof day === 'string') return day;
    return '';
  };

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h6" component="h3">
                {classData.name}
              </Typography>
              <Chip 
                label={classData.status} 
                color={getStatusColor(classData.status)} 
                size="small" 
              />
            </Box>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Book size={16} />
                <Typography variant="body2" color="text.secondary">
                  {classData.subjects?.join(', ') || 'N/A'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Calendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  {formatScheduleDay(classData.scheduleDay)} - {classData.startTime} to {classData.endTime}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Profile2User size={16} />
                <Typography variant="body2" color="text.secondary">
                  {classData.students_count} students
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleViewDetails(classData.id)}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            My Classes
          </Typography>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Class Schedule
          </Typography>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : classes.length > 0 ? (
          <>
            {classes.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
            <Grid item xs={12}>
              <MainCard title="Class Schedule Table">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Class Name</TableCell>
                        <TableCell>Subjects</TableCell>
                        <TableCell>Schedule</TableCell>
                        <TableCell align="center">Students</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classes.map((classData) => (
                        <TableRow key={classData.id}>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {classData.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{classData.subjects?.join(', ') || 'N/A'}</TableCell>
                          <TableCell>
                            {formatScheduleDay(classData.scheduleDay)} - {classData.startTime} to {classData.endTime}
                          </TableCell>
                          <TableCell align="center">{classData.students_count}</TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={classData.status} 
                              color={getStatusColor(classData.status)} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button 
                                size="small" 
                                variant="outlined"
                                onClick={() => handleViewDetails(classData.id)}
                              >
                                View
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <MainCard>
              <Box display="flex" justifyContent="center" p={4}>
                <Typography variant="body1" color="text.secondary">
                  No classes assigned to you.
                </Typography>
              </Box>
            </MainCard>
          </Grid>
        )}
      </Grid>
      {/* Details Modal */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Class Details</DialogTitle>
        <DialogContent>
          {detailsLoading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : detailsClass ? (
            <Box>
              <Typography variant="h6">{detailsClass.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Schedule: {detailsClass.scheduleDay} - {detailsClass.startTime} to {detailsClass.endTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subjects: {detailsClass.subjects?.join(', ') || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Students ({detailsStudents.length}):
              </Typography>
              <ul>
                {detailsStudents.map((student, idx) => (
                  <li key={idx}>{student}</li>
                ))}
              </ul>
            </Box>
          ) : (
            <Typography>No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeacherClasses;
