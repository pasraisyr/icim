import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, Edit, Trash, Profile2User, UserAdd } from 'iconsax-react';

// types
interface StudentAllocationData {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Class {
  id: string;
  name: string;
  capacity: number;
  enrolled: number;
}

// mock data
const mockStudents: Student[] = [
  { id: '1', name: 'Ahmad Rahman', email: 'ahmad.rahman@school.edu' },
  { id: '2', name: 'Siti Aminah', email: 'siti.aminah@school.edu' },
  { id: '3', name: 'Muhammad Ali', email: 'muhammad.ali@school.edu' },
  { id: '4', name: 'Fatimah Zahra', email: 'fatimah.zahra@school.edu' },
  { id: '5', name: 'Omar Hassan', email: 'omar.hassan@school.edu' }
];

const mockClasses: Class[] = [
  { id: '1', name: 'Form 5 Science A', capacity: 30, enrolled: 25 },
  { id: '2', name: 'Form 4 Science B', capacity: 25, enrolled: 18 },
  { id: '3', name: 'Form 3 Science C', capacity: 28, enrolled: 22 },
  { id: '4', name: 'Form 2 Arts A', capacity: 30, enrolled: 20 }
];

const mockAllocations: StudentAllocationData[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ahmad Rahman',
    classId: '1',
    className: 'Form 5 Science A',
    enrollmentDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Siti Aminah',
    classId: '2',
    className: 'Form 4 Science B',
    enrollmentDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Muhammad Ali',
    classId: '3',
    className: 'Form 3 Science C',
    enrollmentDate: '2023-09-10',
    status: 'inactive'
  }
];

const initialAllocation: Omit<StudentAllocationData, 'id'> = {
  studentId: '',
  studentName: '',
  classId: '',
  className: '',
  enrollmentDate: new Date().toISOString().split('T')[0],
  status: 'active'
};

// ==============================|| STUDENT ALLOCATION ||============================== //

export default function StudentAllocation() {
  const [allocations, setAllocations] = useState<StudentAllocationData[]>(mockAllocations);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState<Omit<StudentAllocationData, 'id'>>(initialAllocation);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
  };

  const handleEdit = (allocation: StudentAllocationData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);
    setCurrentAllocation({
      studentId: allocation.studentId,
      studentName: allocation.studentName,
      classId: allocation.classId,
      className: allocation.className,
      enrollmentDate: allocation.enrollmentDate,
      status: allocation.status
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId('');
  };

  const handleSave = () => {
    if (editMode) {
      setAllocations(allocations.map(allocation => 
        allocation.id === editingId 
          ? { ...currentAllocation, id: editingId }
          : allocation
      ));
    } else {
      const newAllocation: StudentAllocationData = {
        ...currentAllocation,
        id: Date.now().toString()
      };
      setAllocations([...allocations, newAllocation]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setAllocations(allocations.filter(allocation => allocation.id !== id));
  };

  const handleChange = (field: keyof Omit<StudentAllocationData, 'id'>, value: string) => {
    let updatedAllocation = { ...currentAllocation, [field]: value };

    // Auto-populate related fields
    if (field === 'studentId') {
      const student = mockStudents.find(s => s.id === value);
      if (student) {
        updatedAllocation.studentName = student.name;
      }
    } else if (field === 'classId') {
      const classData = mockClasses.find(c => c.id === value);
      if (classData) {
        updatedAllocation.className = classData.name;
      }
    }

    setCurrentAllocation(updatedAllocation);
  };

  // Get available students (not already allocated)
  const availableStudents = mockStudents.filter(student => 
    !allocations.some(allocation => allocation.studentId === student.id && allocation.status === 'active')
  );

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Student Allocation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Assign students to classes and manage enrollments
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<UserAdd />}
              onClick={handleOpen}
            >
              Allocate Student
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Summary Cards */}
      {/* <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Total Allocations" />
          <CardContent>
            <Typography variant="h3" color="primary">
              {allocations.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Student assignments
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Active Students" />
          <CardContent>
            <Typography variant="h3" color="success.main">
              {allocations.filter(a => a.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Currently enrolled
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Available Students" />
          <CardContent>
            <Typography variant="h3" color="warning.main">
              {availableStudents.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Unassigned students
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Classes Used" />
          <CardContent>
            <Typography variant="h3" color="info.main">
              {new Set(allocations.map(a => a.classId)).size}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Classes with students
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}

      {/* Class Capacity Overview */}
      {/* <Grid item xs={12}>
        <MainCard title="Class Capacity Overview">
          <Grid container spacing={2}>
            {mockClasses.map((classData) => {
              const classAllocations = allocations.filter(
                a => a.classId === classData.id && a.status === 'active'
              ).length;
              const occupancyRate = (classAllocations / classData.capacity) * 100;
              
              return (
                <Grid item xs={12} sm={6} md={3} key={classData.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{classData.name}</Typography>
                      <Typography variant="h4" color="primary">
                        {classAllocations}/{classData.capacity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {occupancyRate.toFixed(1)}% capacity
                      </Typography>
                      <Chip 
                        label={occupancyRate >= 90 ? 'Full' : occupancyRate >= 70 ? 'High' : 'Available'}
                        color={occupancyRate >= 90 ? 'error' : occupancyRate >= 70 ? 'warning' : 'success'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </MainCard>
      </Grid> */}

      {/* Allocations Table */}
      <Grid item xs={12}>
        <MainCard title="Student Allocations">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Enrollment Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Profile2User size={20} />
                        {allocation.studentName}
                      </Stack>
                    </TableCell>
                    <TableCell>{allocation.className}</TableCell>
                    <TableCell>{allocation.enrollmentDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={allocation.status}
                        color={allocation.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(allocation)}
                          color="primary"
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(allocation.id)}
                          color="error"
                        >
                          <Trash size={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      {/* Add/Edit Allocation Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Student Allocation' : 'Allocate Student'}
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Student"
              select
              fullWidth
              value={currentAllocation.studentId}
              onChange={(e) => handleChange('studentId', e.target.value)}
            >
              {(editMode ? mockStudents : availableStudents).map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              label="Class"
              select
              fullWidth
              value={currentAllocation.classId}
              onChange={(e) => handleChange('classId', e.target.value)}
            >
              {mockClasses.map((classData) => {
                const currentEnrolled = allocations.filter(
                  a => a.classId === classData.id && a.status === 'active'
                ).length;
                const isAvailable = currentEnrolled < classData.capacity;
                
                return (
                  <MenuItem 
                    key={classData.id} 
                    value={classData.id}
                    disabled={!isAvailable && !editMode}
                  >
                    {classData.name} ({currentEnrolled}/{classData.capacity})
                    {!isAvailable && ' - Full'}
                  </MenuItem>
                );
              })}
            </TextField>
            
            <TextField
              label="Enrollment Date"
              type="date"
              fullWidth
              value={currentAllocation.enrollmentDate}
              onChange={(e) => handleChange('enrollmentDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Status"
              select
              fullWidth
              value={currentAllocation.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!currentAllocation.studentId || !currentAllocation.classId}
          >
            {editMode ? 'Update' : 'Allocate'} Student
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
