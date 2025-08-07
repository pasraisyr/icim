import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
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
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, Edit, Trash, Teacher, UserAdd } from 'iconsax-react';

// types
interface TeacherAllocationData {
  id: string;
  teacherId: string;
  teacherName: string;
  subjects: {
    subjectId: string;
    subjectName: string;
    schedule: string;
  }[];
  classId: string;
  className: string;
  room: string;
  status: 'active' | 'inactive';
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface Class {
  id: string;
  name: string;
  room: string;
}

// mock data
const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Sarah Johnson', subject: 'Mathematics' },
  { id: '2', name: 'Prof. Ahmad Hassan', subject: 'Physics' },
  { id: '3', name: 'Ms. Fatimah Ali', subject: 'Chemistry' },
  { id: '4', name: 'Mr. John Smith', subject: 'Biology' },
  { id: '5', name: 'Dr. Maria Garcia', subject: 'Computer Science' }
];

const mockSubjects: Subject[] = [
  { id: '1', name: 'Advanced Mathematics', code: 'MATH501' },
  { id: '2', name: 'Physics', code: 'PHY401' },
  { id: '3', name: 'Chemistry', code: 'CHEM401' },
  { id: '4', name: 'Biology', code: 'BIO401' },
  { id: '5', name: 'Computer Science', code: 'CS401' },
  { id: '6', name: 'Statistics', code: 'STAT301' },
  { id: '7', name: 'Calculus', code: 'MATH401' }
];

const mockClasses: Class[] = [
  { id: '1', name: 'Form 5 Science A', room: 'Lab 101' },
  { id: '2', name: 'Form 4 Science B', room: 'Room 205' },
  { id: '3', name: 'Form 3 Science C', room: 'Lab 203' },
  { id: '4', name: 'Form 5 Computer A', room: 'Computer Lab' },
  { id: '5', name: 'Form 4 Mathematics', room: 'Room 301' }
];

const mockAllocations: TeacherAllocationData[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    subjects: [
      {
        subjectId: '1',
        subjectName: 'Advanced Mathematics',
        schedule: 'Mon, Wed, Fri - 9:00 AM'
      }
    ],
    classId: '1',
    className: 'Form 5 Science A',
    room: 'Lab 101',
    status: 'active'
  },
  {
    id: '2',
    teacherId: '2',
    teacherName: 'Prof. Ahmad Hassan',
    subjects: [
      {
        subjectId: '2',
        subjectName: 'Physics',
        schedule: 'Tue, Thu - 2:00 PM'
      }
    ],
    classId: '2',
    className: 'Form 4 Science B',
    room: 'Room 205',
    status: 'active'
  },
  {
    id: '3',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    subjects: [
      {
        subjectId: '1',
        subjectName: 'Advanced Mathematics',
        schedule: 'Mon, Wed - 10:00 AM'
      },
      {
        subjectId: '6',
        subjectName: 'Statistics',
        schedule: 'Tue, Thu - 11:00 AM'
      }
    ],
    classId: '5',
    className: 'Form 4 Mathematics',
    room: 'Room 301',
    status: 'active'
  },
  {
    id: '4',
    teacherId: '5',
    teacherName: 'Dr. Maria Garcia',
    subjects: [
      {
        subjectId: '5',
        subjectName: 'Computer Science',
        schedule: 'Mon, Wed, Fri - 1:00 PM'
      },
      {
        subjectId: '1',
        subjectName: 'Advanced Mathematics',
        schedule: 'Tue, Thu - 3:00 PM'
      }
    ],
    classId: '4',
    className: 'Form 5 Computer A',
    room: 'Computer Lab',
    status: 'active'
  }
];

const initialAllocation: Omit<TeacherAllocationData, 'id'> = {
  teacherId: '',
  teacherName: '',
  subjects: [],
  classId: '',
  className: '',
  room: '',
  status: 'active'
};

// ==============================|| TEACHER ALLOCATION ||============================== //

export default function TeacherAllocation() {
  const [allocations, setAllocations] = useState<TeacherAllocationData[]>(mockAllocations);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState<Omit<TeacherAllocationData, 'id'>>(initialAllocation);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAllocation({
      ...initialAllocation,
      subjects: [{ subjectId: '', subjectName: '', schedule: '' }]
    });
  };

  const handleEdit = (allocation: TeacherAllocationData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);
    setCurrentAllocation({
      teacherId: allocation.teacherId,
      teacherName: allocation.teacherName,
      subjects: [...allocation.subjects],
      classId: allocation.classId,
      className: allocation.className,
      room: allocation.room,
      status: allocation.status
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation({
      ...initialAllocation,
      subjects: [{ subjectId: '', subjectName: '', schedule: '' }]
    });
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
      const newAllocation: TeacherAllocationData = {
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

  const handleChange = (field: keyof Omit<TeacherAllocationData, 'id'>, value: string) => {
    let updatedAllocation = { ...currentAllocation, [field]: value };

    // Auto-populate related fields
    if (field === 'teacherId') {
      const teacher = mockTeachers.find(t => t.id === value);
      if (teacher) {
        updatedAllocation.teacherName = teacher.name;
      }
    } else if (field === 'classId') {
      const classData = mockClasses.find(c => c.id === value);
      if (classData) {
        updatedAllocation.className = classData.name;
        updatedAllocation.room = classData.room;
      }
    }

    setCurrentAllocation(updatedAllocation);
  };

  // Handle adding a new subject to the allocation
  const handleAddSubject = () => {
    setCurrentAllocation({
      ...currentAllocation,
      subjects: [...currentAllocation.subjects, { subjectId: '', subjectName: '', schedule: '' }]
    });
  };

  // Handle removing a subject from the allocation
  const handleRemoveSubject = (index: number) => {
    const updatedSubjects = currentAllocation.subjects.filter((_, i) => i !== index);
    setCurrentAllocation({
      ...currentAllocation,
      subjects: updatedSubjects
    });
  };

  // Handle changing subject details
  const handleSubjectChange = (index: number, field: 'subjectId' | 'subjectName' | 'schedule', value: string) => {
    const updatedSubjects = [...currentAllocation.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };

    // Auto-populate subject name when subject ID changes
    if (field === 'subjectId') {
      const subject = mockSubjects.find(s => s.id === value);
      if (subject) {
        updatedSubjects[index].subjectName = subject.name;
      }
    }

    setCurrentAllocation({
      ...currentAllocation,
      subjects: updatedSubjects
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Teacher Allocation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Assign teachers to subjects and classes
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<UserAdd />}
              onClick={handleOpen}
            >
              Allocate Teacher
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Summary Cards */}
      {/* <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Total Allocations" />
          <CardContent>
            <Typography variant="h3" color="primary">
              {allocations.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active teacher assignments
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Active Teachers" />
          <CardContent>
            <Typography variant="h3" color="success.main">
              {new Set(allocations.map(a => a.teacherId)).size}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Teachers with assignments
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Covered Classes" />
          <CardContent>
            <Typography variant="h3" color="warning.main">
              {new Set(allocations.map(a => a.classId)).size}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Classes with teachers
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}

      {/* Allocations Table */}
      <Grid item xs={12}>
        <MainCard title="Teacher Allocations">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Teacher size={20} />
                        {allocation.teacherName}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        {allocation.subjects.map((subject, index) => (
                          <Chip 
                            key={index}
                            label={subject.subjectName}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{allocation.className}</TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        {allocation.subjects.map((subject, index) => (
                          <Typography key={index} variant="body2">
                            {subject.schedule}
                          </Typography>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{allocation.room}</TableCell>
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
          {editMode ? 'Edit Teacher Allocation' : 'Allocate Teacher'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Teacher"
              select
              fullWidth
              value={currentAllocation.teacherId}
              onChange={(e) => handleChange('teacherId', e.target.value)}
            >
              {mockTeachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name} - {teacher.subject}
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
              {mockClasses.map((classData) => (
                <MenuItem key={classData.id} value={classData.id}>
                  {classData.name} - {classData.room}
                </MenuItem>
              ))}
            </TextField>

            {/* Subjects Section */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Subjects</Typography>
                <Button 
                  size="small" 
                  startIcon={<Add />}
                  onClick={handleAddSubject}
                >
                  Add Subject
                </Button>
              </Stack>

              {currentAllocation.subjects.map((subject, index) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2">Subject {index + 1}</Typography>
                      {currentAllocation.subjects.length > 1 && (
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveSubject(index)}
                        >
                          <Trash size={16} />
                        </IconButton>
                      )}
                    </Stack>
                    
                    <TextField
                      label="Subject"
                      select
                      fullWidth
                      value={subject.subjectId}
                      onChange={(e) => handleSubjectChange(index, 'subjectId', e.target.value)}
                    >
                      {mockSubjects
                        .filter(subjectOption => 
                          !currentAllocation.subjects.some((s, i) => 
                            i !== index && s.subjectId === subjectOption.id
                          )
                        )
                        .map((subjectOption) => (
                          <MenuItem key={subjectOption.id} value={subjectOption.id}>
                            {subjectOption.name} ({subjectOption.code})
                          </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField
                      label="Schedule"
                      fullWidth
                      placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                      value={subject.schedule}
                      onChange={(e) => handleSubjectChange(index, 'schedule', e.target.value)}
                    />
                  </Stack>
                </Card>
              ))}

              {currentAllocation.subjects.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="textSecondary">
                    No subjects added. Click "Add Subject" to begin.
                  </Typography>
                </Box>
              )}
            </Box>
            
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={
              !currentAllocation.teacherId || 
              !currentAllocation.classId || 
              currentAllocation.subjects.length === 0 ||
              currentAllocation.subjects.some(subject => !subject.subjectId || !subject.schedule)
            }
          >
            {editMode ? 'Update' : 'Allocate'} Teacher
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
