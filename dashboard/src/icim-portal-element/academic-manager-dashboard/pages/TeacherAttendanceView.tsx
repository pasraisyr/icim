import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Teacher, Calendar, Clock, TickCircle, CloseSquare } from 'iconsax-react';

// types
interface TeacherAttendance {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hoursWorked: number;
  subject: string;
}

// mock data
const mockAttendance: TeacherAttendance[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    date: '2024-08-05',
    clockIn: '08:00',
    clockOut: '16:00',
    status: 'present',
    hoursWorked: 8,
    subject: 'Mathematics'
  },
  {
    id: '2',
    teacherId: '2',
    teacherName: 'Prof. Ahmad Hassan',
    date: '2024-08-05',
    clockIn: '08:15',
    clockOut: '16:00',
    status: 'late',
    hoursWorked: 7.75,
    subject: 'Physics'
  },
  {
    id: '3',
    teacherId: '3',
    teacherName: 'Ms. Fatimah Ali',
    date: '2024-08-05',
    clockIn: '-',
    clockOut: '-',
    status: 'absent',
    hoursWorked: 0,
    subject: 'Chemistry'
  },
  {
    id: '4',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    date: '2024-08-04',
    clockIn: '08:00',
    clockOut: '12:00',
    status: 'half-day',
    hoursWorked: 4,
    subject: 'Mathematics'
  },
  {
    id: '5',
    teacherId: '2',
    teacherName: 'Prof. Ahmad Hassan',
    date: '2024-08-04',
    clockIn: '07:55',
    clockOut: '16:05',
    status: 'present',
    hoursWorked: 8.17,
    subject: 'Physics'
  }
];

// ==============================|| TEACHER ATTENDANCE VIEW ||============================== //

export default function TeacherAttendanceView() {
  const [attendance, setAttendance] = useState<TeacherAttendance[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTeacher, setSelectedTeacher] = useState('all');

  // Filter attendance data
  const filteredAttendance = attendance.filter(record => {
    const dateMatch = selectedDate ? record.date === selectedDate : true;
    const teacherMatch = selectedTeacher === 'all' || record.teacherId === selectedTeacher;
    return dateMatch && teacherMatch;
  });

  // Calculate statistics
  const totalTeachers = new Set(attendance.map(a => a.teacherId)).size;
  const todayAttendance = attendance.filter(a => a.date === selectedDate);
  const presentToday = todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
  const lateToday = todayAttendance.filter(a => a.status === 'late').length;
  const attendanceRate = todayAttendance.length > 0 ? (presentToday / todayAttendance.length) * 100 : 0;

  // Get unique teachers for filter
  const teachers = Array.from(new Set(attendance.map(a => ({ id: a.teacherId, name: a.teacherName }))))
    .filter((teacher, index, arr) => arr.findIndex(t => t.id === teacher.id) === index);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'late':
        return 'warning';
      case 'absent':
        return 'error';
      case 'half-day':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement | undefined => {
    switch (status) {
      case 'present':
        return <TickCircle size={16} />;
      case 'late':
        return <Clock size={16} />;
      case 'absent':
        return <CloseSquare size={16} />;
      case 'half-day':
        return <Calendar size={16} />;
      default:
        return undefined;
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack spacing={2}>
            <Typography variant="h4" color="primary">
              Teacher Attendance View
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Monitor and track teacher attendance records
            </Typography>
            
            {/* Filters */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 200 }}
              />
              <TextField
                label="Teacher"
                select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="all">All Teachers</MenuItem>
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader 
            title="Attendance Rate"
            avatar={<TickCircle size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="primary">
              {attendanceRate.toFixed(1)}%
            </Typography>
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={attendanceRate} 
                color="primary"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              For {selectedDate}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader 
            title="Present Today"
            avatar={<TickCircle size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="success.main">
              {presentToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Out of {todayAttendance.length} teachers
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader 
            title="Late Arrivals"
            avatar={<Clock size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="warning.main">
              {lateToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Teachers arrived late
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader 
            title="Absent Today"
            avatar={<CloseSquare size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="error.main">
              {absentToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Teachers not present
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Attendance Table */}
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Clock In</TableCell>
                  <TableCell>Clock Out</TableCell>
                  <TableCell>Hours Worked</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Teacher size={20} />
                        {record.teacherName}
                      </Stack>
                    </TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      {record.clockIn !== '-' ? (
                        <Chip 
                          label={record.clockIn}
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {record.clockOut !== '-' ? (
                        <Chip 
                          label={record.clockOut}
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {record.hoursWorked > 0 ? `${record.hoursWorked}h` : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={record.status}
                        color={getStatusColor(record.status) as any}
                        size="small"
                        icon={getStatusIcon(record.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredAttendance.length === 0 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No attendance records found for the selected criteria
              </Typography>
            </Box>
          )}
        </MainCard>
      </Grid>

      {/* Weekly Summary */}
      <Grid item xs={12}>
        <MainCard title="Weekly Attendance Summary">
          <Grid container spacing={2}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
              const dayDate = new Date();
              dayDate.setDate(dayDate.getDate() - dayDate.getDay() + index + 1);
              const dayDateStr = dayDate.toISOString().split('T')[0];
              
              const dayRecords = attendance.filter(a => a.date === dayDateStr);
              const dayPresent = dayRecords.filter(a => a.status === 'present' || a.status === 'late').length;
              const dayTotal = dayRecords.length;
              const dayRate = dayTotal > 0 ? (dayPresent / dayTotal) * 100 : 0;
              
              return (
                <Grid item xs={12} sm={6} md key={day}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6">{day}</Typography>
                      <Typography variant="h4" color="primary">
                        {dayRate.toFixed(0)}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayPresent}/{dayTotal}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
