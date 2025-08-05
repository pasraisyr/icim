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
import { Add, Edit, Trash, Book } from 'iconsax-react';

// types
interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'inactive';
}

// mock data
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Form 5 Science A',
    subject: 'Physics',
    teacher: 'Dr. Ahmad Hassan',
    room: 'Lab 101',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    capacity: 30,
    enrolled: 25,
    status: 'active'
  },
  {
    id: '2',
    name: 'Form 4 Arts B',
    subject: 'Literature',
    teacher: 'Ms. Sarah Johnson',
    room: 'Room 205',
    schedule: 'Tue, Thu - 2:00 PM',
    capacity: 25,
    enrolled: 18,
    status: 'active'
  },
  {
    id: '3',
    name: 'Form 3 Science C',
    subject: 'Chemistry',
    teacher: 'Ms. Fatimah Ali',
    room: 'Lab 203',
    schedule: 'Mon, Wed - 11:00 AM',
    capacity: 28,
    enrolled: 22,
    status: 'inactive'
  }
];

const initialClass: Omit<Class, 'id'> = {
  name: '',
  subject: '',
  teacher: '',
  room: '',
  schedule: '',
  capacity: 0,
  enrolled: 0,
  status: 'active'
};

// ==============================|| CLASSES MANAGEMENT ||============================== //

export default function ClassesManagement() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState<Omit<Class, 'id'>>(initialClass);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentClass(initialClass);
  };

  const handleEdit = (classItem: Class) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(classItem.id);
    setCurrentClass({
      name: classItem.name,
      subject: classItem.subject,
      teacher: classItem.teacher,
      room: classItem.room,
      schedule: classItem.schedule,
      capacity: classItem.capacity,
      enrolled: classItem.enrolled,
      status: classItem.status
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentClass(initialClass);
    setEditingId('');
  };

  const handleSave = () => {
    if (editMode) {
      setClasses(classes.map(classItem => 
        classItem.id === editingId 
          ? { ...currentClass, id: editingId }
          : classItem
      ));
    } else {
      const newClass: Class = {
        ...currentClass,
        id: Date.now().toString()
      };
      setClasses([...classes, newClass]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter(classItem => classItem.id !== id));
  };

  const handleChange = (field: keyof Omit<Class, 'id'>, value: string | number) => {
    setCurrentClass({ ...currentClass, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Classes Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage class schedules, rooms, and assignments
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Add Class
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Classes Table */}
      <Grid item xs={12}>
        <MainCard title="Classes List">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Enrollment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Book size={20} />
                        {classItem.name}
                      </Stack>
                    </TableCell>
                    <TableCell>{classItem.subject}</TableCell>
                    <TableCell>{classItem.teacher}</TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>{classItem.schedule}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {classItem.enrolled}/{classItem.capacity}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {Math.round((classItem.enrolled / classItem.capacity) * 100)}% filled
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={classItem.status}
                        color={classItem.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(classItem)}
                          color="primary"
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(classItem.id)}
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

      {/* Add/Edit Class Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Class' : 'Add New Class'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Class Name"
              fullWidth
              value={currentClass.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              label="Subject"
              fullWidth
              value={currentClass.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
            />
            <TextField
              label="Teacher"
              fullWidth
              value={currentClass.teacher}
              onChange={(e) => handleChange('teacher', e.target.value)}
            />
            <TextField
              label="Room"
              fullWidth
              value={currentClass.room}
              onChange={(e) => handleChange('room', e.target.value)}
            />
            <TextField
              label="Schedule"
              fullWidth
              placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
              value={currentClass.schedule}
              onChange={(e) => handleChange('schedule', e.target.value)}
            />
            <TextField
              label="Capacity"
              type="number"
              fullWidth
              value={currentClass.capacity}
              onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
            />
            <TextField
              label="Currently Enrolled"
              type="number"
              fullWidth
              value={currentClass.enrolled}
              onChange={(e) => handleChange('enrolled', parseInt(e.target.value) || 0)}
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={currentClass.status}
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
            disabled={!currentClass.name || !currentClass.subject || !currentClass.teacher}
          >
            {editMode ? 'Update' : 'Add'} Class
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
