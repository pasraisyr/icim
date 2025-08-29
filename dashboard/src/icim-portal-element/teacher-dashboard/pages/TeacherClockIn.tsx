import { useState, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Clock, Timer, Location, Profile2User } from 'iconsax-react';

// types
import type { ClockRecord } from '../types/teacher-types';

// mock data
const mockClockRecords: ClockRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    clockIn: '08:30 AM',
    clockOut: '04:30 PM',
    totalHours: 8,
    status: 'present',
    location: 'School Campus'
  },
  {
    id: '2',
    date: '2024-01-14',
    clockIn: '08:45 AM',
    clockOut: '04:15 PM',
    totalHours: 7.5,
    status: 'present',
    location: 'School Campus'
  },
  {
    id: '3',
    date: '2024-01-13',
    clockIn: '09:00 AM',
    clockOut: '02:00 PM',
    totalHours: 5,
    status: 'partial',
    location: 'School Campus'
  },
  {
    id: '4',
    date: '2024-01-12',
    status: 'absent'
  }
];

// ==============================|| TEACHER DASHBOARD - CLOCK IN/OUT ||============================== //

export default function TeacherClockIn() {
  const [clockRecords] = useState<ClockRecord[]>(mockClockRecords);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorking, setIsWorking] = useState(false);
  const [todayRecord, setTodayRecord] = useState<ClockRecord | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check if there's a record for today
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = clockRecords.find(record => record.date === today);
    setTodayRecord(todayEntry || null);
    setIsWorking(todayEntry?.clockIn && !todayEntry?.clockOut ? true : false);

    return () => clearInterval(timer);
  }, [clockRecords]);

  const handleClockIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(`Clocking in at ${timeString}`);
    setIsWorking(true);
    // Here you would normally send this to your backend
  };

  const handleClockOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(`Clocking out at ${timeString}`);
    setIsWorking(false);
    // Here you would normally send this to your backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'partial':
        return 'warning';
      case 'absent':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (time: Date) => {
    return time.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalHoursThisWeek = clockRecords
    .filter(record => record.totalHours)
    .reduce((sum, record) => sum + (record.totalHours || 0), 0);

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Clock In/Out</Typography>
          <Chip 
            label={isWorking ? 'Currently Working' : 'Not Working'} 
            color={isWorking ? 'success' : 'default'}
            size="medium"
          />
        </Stack>
      </Grid>

      {/* Current Time Display */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Stack spacing={2} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Clock size="24" />
              <Typography variant="h3" component="div">
                {formatTime(currentTime)}
              </Typography>
            </Stack>
            <Typography variant="h6" color="text.secondary">
              {formatDate(currentTime)}
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      {/* Clock In/Out Controls */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h5">Today's Attendance</Typography>
              
              {todayRecord?.clockIn && (
                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">Clock In</Typography>
                    <Typography variant="h6">{todayRecord.clockIn}</Typography>
                  </Stack>
                  {todayRecord.clockOut && (
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">Clock Out</Typography>
                      <Typography variant="h6">{todayRecord.clockOut}</Typography>
                    </Stack>
                  )}
                  {todayRecord.totalHours && (
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">Total Hours</Typography>
                      <Typography variant="h6">{todayRecord.totalHours}h</Typography>
                    </Stack>
                  )}
                </Stack>
              )}

              <Stack direction="row" spacing={2}>
                {!isWorking ? (
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<Timer />}
                    onClick={handleClockIn}
                    sx={{ minWidth: 150 }}
                  >
                    Clock In
                  </Button>
                ) : (
                  <Button 
                    variant="outlined" 
                    size="large" 
                    startIcon={<Timer />}
                    onClick={handleClockOut}
                    sx={{ minWidth: 150 }}
                  >
                    Clock Out
                  </Button>
                )}
                <Button 
                  variant="outlined" 
                  size="large" 
                  startIcon={<Location />}
                >
                  Check Location
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Weekly Summary */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h4" color="primary.main">
                    {totalHoursThisWeek}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Hours This Week
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
                    {clockRecords.filter(r => r.status === 'present').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Days Present
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
                    {clockRecords.filter(r => r.status === 'partial').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Partial Days
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
                    {clockRecords.filter(r => r.status === 'absent').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Days Absent
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Attendance History */}
      <Grid item xs={12}>
        <MainCard title="Attendance History" content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Clock In</TableCell>
                  <TableCell>Clock Out</TableCell>
                  <TableCell>Total Hours</TableCell>
                  {/* <TableCell>Location</TableCell> */}
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clockRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Typography variant="body2">{record.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Timer size="16" />
                        <Typography variant="body2">
                          {record.clockIn || 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Timer size="16" />
                        <Typography variant="body2">
                          {record.clockOut || 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.totalHours ? `${record.totalHours}h` : 'N/A'}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Location size="16" />
                        <Typography variant="body2">
                          {record.location || 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell> */}
                    <TableCell>
                      <Chip 
                        label={record.status} 
                        color={getStatusColor(record.status) as any}
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
}
