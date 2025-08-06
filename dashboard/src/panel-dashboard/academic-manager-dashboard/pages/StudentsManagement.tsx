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
import { Add, Edit, Trash, Profile2User, Eye } from 'iconsax-react';

// types
interface Student {
  id: string;
  guardianName: string;
  guardianIC: string;
  guardianPhone: string;
  studentName: string;
  studentIC: string;
  address: string;
  class: string;
  level: 'Standard 5' | 'Standard 6';
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

// mock data
const mockStudents: Student[] = [
  {
    id: '1',
    guardianName: 'Ahmad bin Ali',
    guardianIC: '123456789012',
    guardianPhone: '+60123456789',
    studentName: 'Ali bin Ahmad',
    studentIC: '987654321098',
    address: '123 Jalan ABC, Kuala Lumpur',
    class: 'Form 5 Science',
    level: 'Standard 5',
    status: 'active',
    enrollmentDate: '2024-02-15'
  },
  {
    id: '2',
    guardianName: 'Fatimah binti Abu',
    guardianIC: '987654321012',
    guardianPhone: '+60123456780',
    studentName: 'Aminah binti Ahmad',
    studentIC: '123456789098',
    address: '456 Jalan DEF, Kuala Lumpur',
    class: 'Form 4 Arts',
    level: 'Standard 6',
    status: 'active',
    enrollmentDate: '2024-01-20'
  },
  {
    id: '3',
    guardianName: 'Muhammad Ali',
    guardianIC: '123456789013',
    guardianPhone: '+60123456781',
    studentName: 'Ali bin Muhammad',
    studentIC: '987654321099',
    address: '789 Jalan GHI, Kuala Lumpur',
    class: 'Form 3 Science',
    level: 'Standard 5',
    status: 'inactive',
    enrollmentDate: '2023-09-10'
  }
];

const initialStudent: Omit<Student, 'id'> = {
  guardianName: '',
  guardianIC: '',
  guardianPhone: '',
  studentName: '',
  studentIC: '',
  address: '',
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
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
      guardianName: student.guardianName,
      guardianIC: student.guardianIC,
      guardianPhone: student.guardianPhone,
      studentName: student.studentName,
      studentIC: student.studentIC,
      address: student.address,
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

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setViewDetailsOpen(true);
  };

  const handleCloseViewDetails = () => {
    setViewDetailsOpen(false);
    setSelectedStudent(null);
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
                  <TableCell>Student Name</TableCell>
                  <TableCell>Guardian Phone</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Enrollment Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Profile2User size={20} />
                        {student.studentName}  <br />
                      </Stack>
                    </TableCell>
                    <TableCell>{student.guardianPhone}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.status}
                        color={student.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                   
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewDetails(student)}
                          color="info"
                        >
                          <Eye size={16} />
                        </IconButton>
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
              label="Guardian's Full Name"
              fullWidth
              value={currentStudent.guardianName}
              onChange={(e) => handleChange('guardianName', e.target.value)}
            />
            <TextField
              label="Guardian's IC Number"
              fullWidth
              value={currentStudent.guardianIC}
              onChange={(e) => handleChange('guardianIC', e.target.value)}
            />
            <TextField
              label="Guardian's Phone Number"
              fullWidth
              value={currentStudent.guardianPhone}
              onChange={(e) => handleChange('guardianPhone', e.target.value)}
            />
            <TextField
              label="Student's Full Name"
              fullWidth
              value={currentStudent.studentName}
              onChange={(e) => handleChange('studentName', e.target.value)}
            />
            <TextField
              label="Student's IC Number"
              fullWidth
              value={currentStudent.studentIC}
              onChange={(e) => handleChange('studentIC', e.target.value)}
            />
            <TextField
              label="Address"
              fullWidth
              value={currentStudent.address}
              onChange={(e) => handleChange('address', e.target.value)}
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
            disabled={!currentStudent.guardianName || !currentStudent.guardianIC || !currentStudent.guardianPhone || !currentStudent.studentName || !currentStudent.studentIC || !currentStudent.address || !currentStudent.class}
          >
            {editMode ? 'Update' : 'Add'} Student
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Student Details Dialog */}
      <Dialog open={viewDetailsOpen} onClose={handleCloseViewDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          Student Details
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Student Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Student Name</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.studentName}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Student IC Number</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.studentIC}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Class</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.class}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Level</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.level}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Status</Typography>
                        <Chip 
                          label={selectedStudent.status}
                          color={selectedStudent.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Enrollment Date</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.enrollmentDate}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">Address</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.address}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Guardian Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Guardian Name</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.guardianName}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Guardian IC Number</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.guardianIC}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Guardian Phone</Typography>
                        <Typography variant="body1" fontWeight="medium">{selectedStudent.guardianPhone}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDetails}>Close</Button>
          <Button 
            onClick={() => {
              if (selectedStudent) {
                handleCloseViewDetails();
                handleEdit(selectedStudent);
              }
            }}
            variant="contained"
            startIcon={<Edit />}
          >
            Edit Student
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
