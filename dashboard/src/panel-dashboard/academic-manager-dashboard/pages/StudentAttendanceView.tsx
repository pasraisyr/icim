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
import { Profile2User, Calendar, TickCircle, CloseSquare, Clock } from 'iconsax-react';

// types
interface StudentAttendance {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn: string;
  remarks?: string;
}

// mock data
const mockAttendance: StudentAttendance[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ahmad Rahman',
    classId: '1',
    className: 'Form 5 Science A',
    date: '2024-08-05',
    subject: 'Mathematics',
    status: 'present',
    timeIn: '08:00'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Siti Aminah',
    classId: '2',
    className: 'Form 4 Science B',
    date: '2024-08-05',
    subject: 'Physics',
    status: 'late',
    timeIn: '08:15',
    remarks: 'Traffic delay'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Muhammad Ali',
    classId: '3',
    className: 'Form 3 Science C',
    date: '2024-08-05',
    subject: 'Chemistry',
    status: 'absent',
    timeIn: '-',
    remarks: 'Illness'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Fatimah Zahra',
    classId: '1',
    className: 'Form 5 Science A',
    date: '2024-08-05',
    subject: 'Mathematics',
    status: 'present',
    timeIn: '07:55'
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Omar Hassan',
    classId: '2',
    className: 'Form 4 Science B',
    date: '2024-08-05',
    subject: 'Physics',
    status: 'excused',
    timeIn: '-',
    remarks: 'Medical appointment'
  },
  {
    id: '6',
    studentId: '1',
    studentName: 'Ahmad Rahman',
    classId: '1',
    className: 'Form 5 Science A',
    date: '2024-08-04',
    subject: 'Mathematics',
    status: 'present',
    timeIn: '08:00'
  },
  {
    id: '7',
    studentId: '2',
    studentName: 'Siti Aminah',
    classId: '2',
    className: 'Form 4 Science B',
    date: '2024-08-04',
    subject: 'Physics',
    status: 'present',
    timeIn: '07:58'
  }
];

// ==============================|| STUDENT ATTENDANCE VIEW ||============================== //

export default function StudentAttendanceView() {
  const [attendance, setAttendance] = useState<StudentAttendance[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');

  // Filter attendance data
  const filteredAttendance = attendance.filter(record => {
    const dateMatch = selectedDate ? record.date === selectedDate : true;
    const classMatch = selectedClass === 'all' || record.classId === selectedClass;
    const studentMatch = selectedStudent === 'all' || record.studentId === selectedStudent;
    return dateMatch && classMatch && studentMatch;
  });

  // Calculate statistics
  const todayAttendance = attendance.filter(a => a.date === selectedDate);
  const presentToday = todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
  const lateToday = todayAttendance.filter(a => a.status === 'late').length;
  const excusedToday = todayAttendance.filter(a => a.status === 'excused').length;
  const attendanceRate = todayAttendance.length > 0 ? (presentToday / todayAttendance.length) * 100 : 0;

  // Get unique classes and students for filters
  const classes = Array.from(new Set(attendance.map(a => ({ id: a.classId, name: a.className }))))
    .filter((cls, index, arr) => arr.findIndex(c => c.id === cls.id) === index);
  
  const students = Array.from(new Set(attendance.map(a => ({ id: a.studentId, name: a.studentName }))))
    .filter((student, index, arr) => arr.findIndex(s => s.id === student.id) === index);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'late':
        return 'warning';
      case 'absent':
        return 'error';
      case 'excused':
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
      case 'excused':
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
              Student Attendance View
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Monitor and track student attendance records across classes
            </Typography>
            
            {/* Filters */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 150 }}
              />
              <TextField
                label="Class"
                select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="all">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Student"
                select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="all">All Students</MenuItem>
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
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

      <Grid item xs={12} md={2.25}>
        <Card>
          <CardHeader 
            title="Present"
            avatar={<TickCircle size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="success.main">
              {presentToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Students present
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={2.25}>
        <Card>
          <CardHeader 
            title="Late"
            avatar={<Clock size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="warning.main">
              {lateToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Late arrivals
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={2.25}>
        <Card>
          <CardHeader 
            title="Absent"
            avatar={<CloseSquare size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="error.main">
              {absentToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Not present
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={2.25}>
        <Card>
          <CardHeader 
            title="Excused"
            avatar={<Calendar size={24} />}
          />
          <CardContent>
            <Typography variant="h3" color="info.main">
              {excusedToday}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Excused absence
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Class-wise Attendance Summary */}
      <Grid item xs={12}>
        <MainCard title="Class-wise Attendance Summary">
          <Grid container spacing={2}>
            {classes.map((cls) => {
              const classRecords = todayAttendance.filter(a => a.classId === cls.id);
              const classPresent = classRecords.filter(a => a.status === 'present' || a.status === 'late').length;
              const classTotal = classRecords.length;
              const classRate = classTotal > 0 ? (classPresent / classTotal) * 100 : 0;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={cls.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>{cls.name}</Typography>
                      <Typography variant="h4" color="primary">
                        {classRate.toFixed(0)}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {classPresent}/{classTotal} present
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={classRate} 
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </MainCard>
      </Grid>

      {/* Attendance Table */}
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time In</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Profile2User size={20} />
                        {record.studentName}
                      </Stack>
                    </TableCell>
                    <TableCell>{record.className}</TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      {record.timeIn !== '-' ? (
                        <Chip 
                          label={record.timeIn}
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={record.status}
                        color={getStatusColor(record.status) as any}
                        size="small"
                        icon={getStatusIcon(record.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {record.remarks || '-'}
                      </Typography>
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

      {/* Weekly Attendance Trend */}
      <Grid item xs={12}>
        <MainCard title="Weekly Attendance Trend">
          <Grid container spacing={2}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => {
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
                      <LinearProgress 
                        variant="determinate" 
                        value={dayRate} 
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
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
