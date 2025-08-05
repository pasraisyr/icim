import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, Edit, Trash, Profile2User } from 'iconsax-react';

// types
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  level: 'Standard 5' | 'Standard 6';
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

// mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@school.edu',
    phone: '+60123456789',
    class: 'Form 5 Science',
    level: 'Standard 5',
    status: 'active',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Siti Aminah',
    email: 'siti.aminah@school.edu',
    phone: '+60987654321',
    class: 'Form 4 Arts',
    level: 'Standard 6',
    status: 'active',
    enrollmentDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Muhammad Ali',
    email: 'muhammad.ali@school.edu',
    phone: '+60555123456',
    class: 'Form 3 Science',
    level: 'Standard 5',
    status: 'inactive',
    enrollmentDate: '2023-09-10'
  }
];

const initialStudent: Omit<Student, 'id'> = {
  name: '',
  email: '',
  phone: '',
  class: '',
  level: 'Standard 5',
  status: 'active',
  enrollmentDate: new Date().toISOString().split('T')[0]
};

// ==============================|| STUDENTS MANAGEMENT ||============================== //

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Omit<Student, 'id'>>(initialStudent);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentStudent(initialStudent);
  };

  const handleEdit = (student: Student) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(student.id);
    setCurrentStudent({
      name: student.name,
      email: student.email,
      phone: student.phone,
      class: student.class,
      level: student.level,
      status: student.status,
      enrollmentDate: student.enrollmentDate
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentStudent(initialStudent);
    setEditingId('');
  };

  const handleSave = () => {
    if (editMode) {
      setStudents(students.map(student => 
        student.id === editingId 
          ? { ...currentStudent, id: editingId }
          : student
      ));
    } else {
      const newStudent: Student = {
        ...currentStudent,
        id: Date.now().toString()
      };
      setStudents([...students, newStudent]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleChange = (field: keyof Omit<Student, 'id'>, value: string) => {
    setCurrentStudent({ ...currentStudent, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Students Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage student records, enrollment, and information
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Add Student
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Students Table */}
      <Grid item xs={12}>
        <MainCard title="Students List">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Enrollment Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Profile2User size={20} />
                        {student.name}
                      </Stack>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.status}
                        color={student.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(student)}
                          color="primary"
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(student.id)}
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

      {/* Add/Edit Student Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={currentStudent.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={currentStudent.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <TextField
              label="Phone"
              fullWidth
              value={currentStudent.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <TextField
              label="Class"
              fullWidth
              value={currentStudent.class}
              onChange={(e) => handleChange('class', e.target.value)}
            />
            <TextField
              label="Level"
              select
              fullWidth
              value={currentStudent.level}
              onChange={(e) => handleChange('level', e.target.value)}
            >
              <MenuItem value="Standard 5">Standard 5</MenuItem>
              <MenuItem value="Standard 6">Standard 6</MenuItem>
            </TextField>
            <TextField
              label="Status"
              select
              fullWidth
              value={currentStudent.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <TextField
              label="Enrollment Date"
              type="date"
              fullWidth
              value={currentStudent.enrollmentDate}
              onChange={(e) => handleChange('enrollmentDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!currentStudent.name || !currentStudent.email}
          >
            {editMode ? 'Update' : 'Add'} Student
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
