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
  status: 'active' | 'inactive';
}

interface Class {
  id: string;
  name: string;
  subjects: string[]; // Multiple subject IDs
  level: 'Primary' | 'Secondary' | 'Tuition';
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'active' | 'inactive';
}

// Available subjects (this could come from an API or context)
const availableSubjects: Subject[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics',
    status: 'active'
  },
  {
    id: '3',
    name: 'Chemistry',
    status: 'active'
  },
  {
    id: '4',
    name: 'Literature',
    status: 'active'
  },
  {
    id: '5',
    name: 'Islamic Studies',
    status: 'active'
  },
  {
    id: '6',
    name: 'Arabic Language',
    status: 'active'
  }
];

// Available days and times
const availableDays = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const availableTimes = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM'
];

// mock data
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Form 5 Mathematics',
    subjects: ['1'], // Advanced Mathematics
    level: 'Secondary',
    scheduleDay: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    price: 280,
    status: 'active'
  },
  {
    id: '2',
    name: 'Form 4 Literature',
    subjects: ['4'], // Literature
    level: 'Secondary',
    scheduleDay: 'Tuesday',
    startTime: '14:00',
    endTime: '15:30',
    price: 140,
    status: 'active'
  },
  {
    id: '3',
    name: 'Physics Class',
    subjects: ['2'], // Physics
    level: 'Secondary',
    scheduleDay: 'Monday',
    startTime: '11:00',
    endTime: '12:30',
    price: 250,
    status: 'inactive'
  }
];

const initialClass: Omit<Class, 'id'> = {
  name: '',
  subjects: [],
  level: 'Primary',
  scheduleDay: '',
  startTime: '',
  endTime: '',
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
  const getSubjectNames = (subjectIds: string[]): string => {
    const subjects = subjectIds.map(id => {
      const subject = availableSubjects.find(s => s.id === id);
      return subject ? subject.name : 'Unknown Subject';
    });
    return subjects.join(', ');
  };

  // Helper function to format time display
  const formatTimeRange = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return 'Not set';
    return `${startTime} - ${endTime}`;
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
      level: classItem.level,
      scheduleDay: classItem.scheduleDay,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
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
                  <TableCell>Subject</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Price</TableCell>
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
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {classItem.subjects.map((subjectId) => (
                          <Chip 
                            key={subjectId}
                            label={availableSubjects.find(s => s.id === subjectId)?.name || 'Unknown'}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{classItem.level}</TableCell>
                    <TableCell>
                      {classItem.scheduleDay} - {formatTimeRange(classItem.startTime, classItem.endTime)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary">
                        RM{classItem.price}/month
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
                    {(selected as string[]).map((value) => (
                      <Chip 
                        key={value} 
                        label={availableSubjects.find(s => s.id === value)?.name || 'Unknown'}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {availableSubjects.filter(subject => subject.status === 'active').map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Level"
              select
              fullWidth
              value={currentClass.level}
              onChange={(e) => handleChange('level', e.target.value)}
            >
              <MenuItem value="Primary">Primary</MenuItem>
              <MenuItem value="Secondary">Secondary</MenuItem>
              <MenuItem value="Tuition">Tuition</MenuItem>
            </TextField>
            <TextField
              label="Schedule Day"
              select
              fullWidth
              value={currentClass.scheduleDay}
              onChange={(e) => handleChange('scheduleDay', e.target.value)}
            >
              {availableDays.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={currentClass.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={currentClass.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
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
            disabled={!currentClass.name || currentClass.subjects.length === 0 || !currentClass.scheduleDay || !currentClass.startTime || !currentClass.endTime || currentClass.price <= 0}
          >
            {editMode ? 'Update' : 'Add'} Class
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
