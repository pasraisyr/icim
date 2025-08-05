import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import { Add, Edit, Trash, Teacher as TeacherIcon } from 'iconsax-react';

// types
interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

// mock data
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+60123456789',
    subject: 'Mathematics',
    experience: 8,
    status: 'active',
    joinDate: '2020-03-15'
  },
  {
    id: '2',
    name: 'Prof. Ahmad Hassan',
    email: 'ahmad.hassan@school.edu',
    phone: '+60987654321',
    subject: 'Physics',
    experience: 12,
    status: 'active',
    joinDate: '2018-09-01'
  },
  {
    id: '3',
    name: 'Ms. Fatimah Ali',
    email: 'fatimah.ali@school.edu',
    phone: '+60555123456',
    subject: 'Chemistry',
    experience: 5,
    status: 'inactive',
    joinDate: '2021-01-10'
  }
];

const initialTeacher: Omit<Teacher, 'id'> = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  experience: 0,
  status: 'active',
  joinDate: new Date().toISOString().split('T')[0]
};

// ==============================|| TEACHERS MANAGEMENT ||============================== //

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Omit<Teacher, 'id'>>(initialTeacher);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
  };

  const handleEdit = (teacher: Teacher) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(teacher.id);
    setCurrentTeacher({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      experience: teacher.experience,
      status: teacher.status,
      joinDate: teacher.joinDate
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
    setEditingId('');
  };

  const handleSave = () => {
    if (editMode) {
      setTeachers(teachers.map(teacher => 
        teacher.id === editingId 
          ? { ...currentTeacher, id: editingId }
          : teacher
      ));
    } else {
      const newTeacher: Teacher = {
        ...currentTeacher,
        id: Date.now().toString()
      };
      setTeachers([...teachers, newTeacher]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const handleChange = (field: keyof Omit<Teacher, 'id'>, value: string | number) => {
    setCurrentTeacher({ ...currentTeacher, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Teachers Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage teacher profiles, subjects, and assignments
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Add Teacher
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Teachers Table */}
      <Grid item xs={12}>
        <MainCard title="Teachers List">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <TeacherIcon size={20} />
                        {teacher.name}
                      </Stack>
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.experience} years</TableCell>
                    <TableCell>
                      <Chip 
                        label={teacher.status}
                        color={teacher.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{teacher.joinDate}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(teacher)}
                          color="primary"
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(teacher.id)}
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

      {/* Add/Edit Teacher Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={currentTeacher.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={currentTeacher.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <TextField
              label="Phone"
              fullWidth
              value={currentTeacher.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <TextField
              label="Subject"
              fullWidth
              value={currentTeacher.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
            />
            <TextField
              label="Experience (years)"
              type="number"
              fullWidth
              value={currentTeacher.experience}
              onChange={(e) => handleChange('experience', parseInt(e.target.value) || 0)}
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={currentTeacher.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <TextField
              label="Join Date"
              type="date"
              fullWidth
              value={currentTeacher.joinDate}
              onChange={(e) => handleChange('joinDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!currentTeacher.name || !currentTeacher.email || !currentTeacher.subject}
          >
            {editMode ? 'Update' : 'Add'} Teacher
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
