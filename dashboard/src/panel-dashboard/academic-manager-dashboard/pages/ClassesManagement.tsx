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
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, Edit, Trash, Book } from 'iconsax-react';

// types
interface Subject {
  id: string;
  name: string;
  description: string;
  level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'Form 5';
  status: 'active' | 'inactive';
}

interface Class {
  id: string;
  name: string;
  subjects: string[]; // Array of subject IDs
  teacher: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  price: number; // Price per month for the class
  status: 'active' | 'inactive';
}

// Available subjects (this could come from an API or context)
const availableSubjects: Subject[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Calculus, Statistics, and Mathematical Analysis',
    level: 'Form 5',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics',
    description: 'Mechanics, Thermodynamics, and Electromagnetism',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '3',
    name: 'Chemistry',
    description: 'Organic and Inorganic Chemistry',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '4',
    name: 'Literature',
    description: 'English Literature and Creative Writing',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '5',
    name: 'Islamic Studies',
    description: 'Quran, Hadith, and Islamic Jurisprudence',
    level: 'Form 3',
    status: 'active'
  },
  {
    id: '6',
    name: 'Arabic Language',
    description: 'Arabic Grammar, Literature, and Conversation',
    level: 'Form 2',
    status: 'active'
  }
];

// mock data
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Form 5 Science A',
    subjects: ['1', '2'], // Advanced Mathematics and Physics
    teacher: 'Dr. Ahmad Hassan',
    room: 'Lab 101',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    capacity: 30,
    enrolled: 25,
    price: 280, // Combined price for the class
    status: 'active'
  },
  {
    id: '2',
    name: 'Form 4 Arts B',
    subjects: ['4'], // Literature
    teacher: 'Ms. Sarah Johnson',
    room: 'Room 205',
    schedule: 'Tue, Thu - 2:00 PM',
    capacity: 25,
    enrolled: 18,
    price: 140,
    status: 'active'
  },
  {
    id: '3',
    name: 'Form 3 Science C',
    subjects: ['2', '3'], // Physics and Chemistry
    teacher: 'Ms. Fatimah Ali',
    room: 'Lab 203',
    schedule: 'Mon, Wed - 11:00 AM',
    capacity: 28,
    enrolled: 22,
    price: 250,
    status: 'inactive'
  }
];

const initialClass: Omit<Class, 'id'> = {
  name: '',
  subjects: [],
  teacher: '',
  room: '',
  schedule: '',
  capacity: 0,
  enrolled: 0,
  price: 0,
  status: 'active'
};

// ==============================|| CLASSES MANAGEMENT ||============================== //

export default function ClassesManagement() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState<Omit<Class, 'id'>>(initialClass);
  const [editingId, setEditingId] = useState<string>('');

  // Helper function to get subject names from IDs
  const getSubjectNames = (subjectIds: string[]): string[] => {
    return subjectIds.map(id => {
      const subject = availableSubjects.find(s => s.id === id);
      return subject ? subject.name : 'Unknown Subject';
    });
  };

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
      subjects: classItem.subjects,
      teacher: classItem.teacher,
      room: classItem.room,
      schedule: classItem.schedule,
      capacity: classItem.capacity,
      enrolled: classItem.enrolled,
      price: classItem.price,
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

  const handleChange = (field: keyof Omit<Class, 'id'>, value: string | number | string[]) => {
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
                  <TableCell>Subjects</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Price</TableCell>
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
                    <TableCell>
                      <Stack spacing={0.5}>
                        {getSubjectNames(classItem.subjects).map((subjectName, index) => (
                          <Chip 
                            key={index}
                            label={subjectName}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                        {classItem.subjects.length === 0 && (
                          <Typography variant="body2" color="textSecondary">
                            No subjects assigned
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>{classItem.teacher}</TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>{classItem.schedule}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary">
                        RM{classItem.price}/month
                      </Typography>
                    </TableCell>
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
            <FormControl fullWidth>
              <InputLabel>Subjects</InputLabel>
              <Select
                multiple
                value={currentClass.subjects}
                onChange={(e) => handleChange('subjects', e.target.value as string[])}
                input={<OutlinedInput label="Subjects" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => {
                      const subject = availableSubjects.find(s => s.id === value);
                      return (
                        <Chip 
                          key={value} 
                          label={subject?.name || 'Unknown'} 
                          size="small" 
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {availableSubjects.filter(subject => subject.status === 'active').map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    <Stack>
                      <Typography variant="body2">{subject.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {subject.level} - {subject.description}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              label="Price per Month"
              type="number"
              fullWidth
              value={currentClass.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: 'RM'
              }}
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
            disabled={!currentClass.name || currentClass.subjects.length === 0 || !currentClass.teacher || currentClass.price <= 0}
          >
            {editMode ? 'Update' : 'Add'} Class
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
