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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Book, Calendar, Profile2User } from 'iconsax-react';

// local imports
import { teacherAPI, type TeacherAllocation, type Teacher } from './api';

type TeacherClassStudentsResponse = { students: { studentName?: string; name?: string }[] } | { studentName?: string; name?: string }[];
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type ClassData = {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  students: number;
  room: string;
  status: string;
  level: string;
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: string;
  subjects_taught: string[];
};

// ==============================|| TEACHER CLASSES ||============================== //

const TeacherClasses = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsStudents, setDetailsStudents] = useState<string[]>([]);
  const [detailsClass, setDetailsClass] = useState<ClassData | null>(null);

  // Fetch all teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setTeachersLoading(true);
      const teachersData = await teacherAPI.getAllTeachers();
      setTeachers(teachersData);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers');
    } finally {
      setTeachersLoading(false);
    }
  };

  const fetchTeacherClasses = async (teacherId: number) => {
    try {
      setLoading(true);
      setError(null);
      const allocations = await teacherAPI.getTeacherClasses(teacherId);
      const transformedClasses: ClassData[] = allocations.map((allocation: TeacherAllocation) => ({
        id: allocation.class_obj.id,
        name: allocation.class_obj.name,
        subject: allocation.teacher_subjects ? allocation.teacher_subjects.join(', ') : 'N/A',
        schedule: `${allocation.class_obj.scheduleDay} - ${allocation.class_obj.startTime} to ${allocation.class_obj.endTime}`,
        students: allocation.class_obj.students_count,
        room: `Room ${allocation.class_obj.id}`,
        status: allocation.class_obj.status,
        level: allocation.class_obj.level,
        scheduleDay: allocation.class_obj.scheduleDay,
        startTime: allocation.class_obj.startTime,
        endTime: allocation.class_obj.endTime,
        price: allocation.class_obj.price,
        subjects_taught: allocation.teacher_subjects || []
      }));
      setClasses(transformedClasses);
    } catch (error) {
      console.error('Error fetching teacher classes:', error);
      setError('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherChange = (teacherId: number) => {
    setSelectedTeacherId(teacherId);
    fetchTeacherClasses(teacherId);
  };

  const handleViewDetails = async (classId: number) => {
    if (!selectedTeacherId) return;
    setDetailsOpen(true);
    setDetailsLoading(true);
    setDetailsClass(classes.find(c => c.id === classId) || null);
    try {
      const response: TeacherClassStudentsResponse = await teacherAPI.getTeacherClassStudents(selectedTeacherId, classId);
      const studentsArr = Array.isArray(response)
        ? response
        : (response as any).students || [];
      setDetailsStudents(studentsArr.map((s: any) => s.studentName || s.name));
    } catch (err) {
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

  const handleTakeAttendance = (classId: number) => {
    console.log('Take attendance for class:', classId);
    // TODO: Implement navigation to attendance page
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
                  {classData.subject}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap={1}>
                <Calendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  {classData.schedule}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap={1}>
                <Profile2User size={16} />
                <Typography variant="body2" color="text.secondary">
                  {classData.students} students • {classData.room}
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

        {/* Teacher Selection */}
        <Grid item xs={12}>
          <MainCard>
            <FormControl fullWidth>
              <InputLabel>Select Teacher</InputLabel>
              <Select
                value={selectedTeacherId || ''}
                onChange={(e) => handleTeacherChange(Number(e.target.value))}
                label="Select Teacher"
                disabled={teachersLoading}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {teachersLoading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress size={24} />
              </Box>
            )}
          </MainCard>
        </Grid>

        {/* Error Display */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Classes Display */}
        {selectedTeacherId && (
          <>
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
                {/* Class Cards */}
                {classes.map((classData) => (
                  <ClassCard key={classData.id} classData={classData} />
                ))}

                {/* Class Table */}
                <Grid item xs={12}>
                  <MainCard title="Class Schedule Table">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Schedule</TableCell>
                            <TableCell align="center">Students</TableCell>
                            <TableCell>Room</TableCell>
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
                              <TableCell>{classData.subject}</TableCell>
                              <TableCell>{classData.schedule}</TableCell>
                              <TableCell align="center">{classData.students}</TableCell>
                              <TableCell>{classData.room}</TableCell>
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
                      No classes assigned to this teacher.
                    </Typography>
                  </Box>
                </MainCard>
              </Grid>
            )}
          </>
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
                Schedule: {detailsClass.schedule}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subjects: {detailsClass.subject}
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
