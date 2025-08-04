import { useState } from 'react';

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

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Book, Calendar, Profile2User } from 'iconsax-react';

// types
import type { ClassData } from '../types/teacher-types';

// mock data
const mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Mathematics 101',
    subject: 'Mathematics',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    students: 25,
    room: 'Room 201',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics Advanced',
    subject: 'Physics',
    schedule: 'Tue, Thu - 2:00 PM',
    students: 18,
    room: 'Lab 105',
    status: 'active'
  },
  {
    id: '3',
    name: 'Chemistry Basics',
    subject: 'Chemistry',
    schedule: 'Mon, Wed - 11:00 AM',
    students: 22,
    room: 'Lab 203',
    status: 'upcoming'
  }
];

// ==============================|| TEACHER DASHBOARD - MY CLASSES ||============================== //

export default function TeacherClasses() {
  const [classes] = useState<ClassData[]>(mockClasses);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Classes</Typography>
          <Button variant="contained" startIcon={<Book />}>
            Create New Class
          </Button>
        </Stack>
      </Grid>

      {/* Class Cards Overview */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {classes.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack spacing={1}>
                        <Typography variant="h6">{classItem.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {classItem.subject}
                        </Typography>
                      </Stack>
                      <Chip 
                        label={classItem.status} 
                        color={getStatusColor(classItem.status) as any}
                        size="small" 
                      />
                    </Stack>
                    
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size="16" />
                        <Typography variant="body2">{classItem.schedule}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Profile2User size="16" />
                        <Typography variant="body2">{classItem.students} students</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                          📍
                        </Box>
                        <Typography variant="body2">{classItem.room}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                  <Button size="small">Take Attendance</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Classes Table */}
      <Grid item xs={12}>
        <MainCard title="Class Schedule" content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Book size="20" />
                        <Typography variant="subtitle2">{classItem.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{classItem.subject}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size="16" />
                        <Typography variant="body2">{classItem.schedule}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Profile2User size="16" />
                        <Typography variant="body2">{classItem.students}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>
                      <Chip 
                        label={classItem.status} 
                        color={getStatusColor(classItem.status) as any}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined">View</Button>
                        <Button size="small" variant="outlined">Attendance</Button>
                      </Stack>
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
