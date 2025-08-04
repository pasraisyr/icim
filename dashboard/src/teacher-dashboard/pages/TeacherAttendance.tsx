import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
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
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Calendar, Profile2User, Book, Clock } from 'iconsax-react';

// types
import type { AttendanceRecord, Student } from '../types/teacher-types';

// mock data
const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    date: '2024-01-15',
    class: 'Jawi',
    status: 'present',
    timeIn: '09:00 AM'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Sarah Johnson',
    date: '2024-01-15',
    class: 'Jawi',
    status: 'late',
    timeIn: '09:15 AM'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Michael Brown',
    date: '2024-01-15',
    class: 'Jawi',
    status: 'absent'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Emily Davis',
    date: '2024-01-15',
    class: 'Jawi',
    status: 'excused',
    notes: 'Medical appointment'
  }
];

const mockClasses = ['Jawi', 'Arabic', 'Sirah'];

// ==============================|| TEACHER DASHBOARD - ATTENDANCE ||============================== //

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('Jawi');
  const [isRecording, setIsRecording] = useState(false);

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

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendance(prev =>
      prev.map(record =>
        record.studentId === studentId
          ? { ...record, status: newStatus, timeIn: newStatus === 'present' || newStatus === 'late' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined }
          : record
      )
    );
  };

  const attendanceStats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length,
    excused: attendance.filter(a => a.status === 'excused').length
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Attendance Management</Typography>
          <Stack direction="row" spacing={2}>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={isRecording}
                  onChange={(e) => setIsRecording(e.target.checked)}
                />
              }
              label="Live Recording Mode"
            /> */}
            {/* <Button variant="contained" startIcon={<Calendar />}>
              Generate Report
            </Button> */}
          </Stack>
        </Stack>
      </Grid>

      {/* Filters */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <TextField
                label="Date"
                type="date"
                value={selectedDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  label="Class"
                >
                  {mockClasses.map((className) => (
                    <MenuItem key={className} value={className}>
                      {className}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" startIcon={<Book />}>
                Load Attendance
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Attendance Stats */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h4" color="text.primary">
                    {attendanceStats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h4" color="success.main">
                    {attendanceStats.present}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Present
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h4" color="error.main">
                    {attendanceStats.absent}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Absent
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h4" color="warning.main">
                    {attendanceStats.late}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Late
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      <Grid item xs={12}>
        <MainCard title={`Attendance for ${selectedClass} - ${selectedDate?.toLocaleDateString()}`} content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Time In</TableCell>
                  <TableCell>Actions</TableCell>
                  {/* <TableCell>Notes</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {record.studentName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="subtitle2">{record.studentName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={record.status} 
                        color={getStatusColor(record.status) as any}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Clock size="16" />
                        <Typography variant="body2">
                          {record.timeIn || 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button 
                          size="small" 
                          variant={record.status === 'present' ? 'contained' : 'outlined'}
                          color="success"
                          onClick={() => handleStatusChange(record.studentId, 'present')}
                        >
                          Present
                        </Button>
                        <Button 
                          size="small" 
                          variant={record.status === 'absent' ? 'contained' : 'outlined'}
                          color="error"
                          onClick={() => handleStatusChange(record.studentId, 'absent')}
                        >
                          Absent
                        </Button>
                        <Button 
                          size="small" 
                          variant={record.status === 'late' ? 'contained' : 'outlined'}
                          color="warning"
                          onClick={() => handleStatusChange(record.studentId, 'late')}
                        >
                          Late
                        </Button>
                      </Stack>
                    </TableCell>
                    {/* <TableCell>
                      <Typography variant="body2">
                        {record.notes || '-'}
                      </Typography>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      {/* Save Attendance */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" size="large">
            Save Draft
          </Button>
          <Button variant="contained" size="large">
            Submit Attendance
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
