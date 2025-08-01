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
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Profile2User, SearchNormal1, Book, Calendar } from 'iconsax-react';

// types
import type { StudentData } from '../types/teacher-types';

// mock data
const mockStudents: StudentData[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    class: 'Mathematics 101',
    grade: 'A',
    attendance: 95,
    lastActive: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    class: 'Physics Advanced',
    grade: 'B+',
    attendance: 88,
    lastActive: '2024-01-14',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    class: 'Chemistry Basics',
    grade: 'A-',
    attendance: 92,
    lastActive: '2024-01-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    class: 'Mathematics 101',
    grade: 'B',
    attendance: 78,
    lastActive: '2024-01-12',
    status: 'inactive'
  }
];

// ==============================|| TEACHER DASHBOARD - MY STUDENTS ||============================== //

export default function TeacherStudents() {
  const [students, setStudents] = useState<StudentData[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'success';
    if (attendance >= 75) return 'warning';
    return 'error';
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    return 'error';
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Students</Typography>
          <Button variant="contained" startIcon={<Profile2User />}>
            Add Student
          </Button>
        </Stack>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          placeholder="Search students by name, email, or class..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal1 size="20" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Student Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 56, height: 56 }}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Stack spacing={0.5} flex={1}>
                        <Typography variant="h6">{student.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {student.email}
                        </Typography>
                        <Chip 
                          label={student.status} 
                          color={student.status === 'active' ? 'success' : 'default'}
                          size="small" 
                        />
                      </Stack>
                    </Stack>
                    
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Book size="16" />
                        <Typography variant="body2">{student.class}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Grade:</Typography>
                        <Chip 
                          label={student.grade} 
                          color={getGradeColor(student.grade) as any}
                          size="small" 
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Attendance:</Typography>
                        <Chip 
                          label={`${student.attendance}%`} 
                          color={getAttendanceColor(student.attendance) as any}
                          size="small" 
                        />
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size="16" />
                        <Typography variant="body2">Last active: {student.lastActive}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">View Profile</Button>
                  <Button size="small">Send Message</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Students Table */}
      <Grid item xs={12}>
        <MainCard title="Student List" content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Last Active</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle2">{student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {student.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Book size="16" />
                        <Typography variant="body2">{student.class}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={student.grade} 
                        color={getGradeColor(student.grade) as any}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${student.attendance}%`} 
                        color={getAttendanceColor(student.attendance) as any}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{student.lastActive}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={student.status} 
                        color={student.status === 'active' ? 'success' : 'default'}
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined">View</Button>
                        <Button size="small" variant="outlined">Message</Button>
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
