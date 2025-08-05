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
import { Add, Edit, Trash, DocumentText } from 'iconsax-react';

// types
interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  department: string;
  level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'Form 5';
  status: 'active' | 'inactive';
}

// mock data
const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MATH501',
    description: 'Calculus, Statistics, and Mathematical Analysis',
    credits: 4,
    department: 'Mathematics',
    level: 'Form 5',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY401',
    description: 'Mechanics, Thermodynamics, and Electromagnetism',
    credits: 4,
    department: 'Science',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '3',
    name: 'Islamic Studies',
    code: 'IS301',
    description: 'Quran, Hadith, and Islamic Jurisprudence',
    credits: 3,
    department: 'Islamic Studies',
    level: 'Form 3',
    status: 'active'
  },
  {
    id: '4',
    name: 'Arabic Language',
    code: 'AR201',
    description: 'Arabic Grammar, Literature, and Conversation',
    credits: 3,
    department: 'Languages',
    level: 'Form 2',
    status: 'inactive'
  }
];

const initialSubject: Omit<Subject, 'id'> = {
  name: '',
  code: '',
  description: '',
  credits: 0,
  department: '',
  level: 'Form 1',
  status: 'active'
};

// ==============================|| SUBJECTS MANAGEMENT ||============================== //

export default function SubjectsManagement() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Omit<Subject, 'id'>>(initialSubject);
  const [editingId, setEditingId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentSubject(initialSubject);
  };

  const handleEdit = (subject: Subject) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(subject.id);
    setCurrentSubject({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      credits: subject.credits,
      department: subject.department,
      level: subject.level,
      status: subject.status
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentSubject(initialSubject);
    setEditingId('');
  };

  const handleSave = () => {
    if (editMode) {
      setSubjects(subjects.map(subject => 
        subject.id === editingId 
          ? { ...currentSubject, id: editingId }
          : subject
      ));
    } else {
      const newSubject: Subject = {
        ...currentSubject,
        id: Date.now().toString()
      };
      setSubjects([...subjects, newSubject]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleChange = (field: keyof Omit<Subject, 'id'>, value: string | number) => {
    setCurrentSubject({ ...currentSubject, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h4" color="primary">
                Subjects Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage curriculum subjects, credits, and academic requirements
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Add Subject
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* Subjects Table */}
      <Grid item xs={12}>
        <MainCard title="Subjects List">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <DocumentText size={20} />
                        <Stack>
                          <Typography variant="subtitle2">{subject.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {subject.description}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={subject.code} 
                        variant="outlined" 
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{subject.department}</TableCell>
                    <TableCell>{subject.level}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
                    <TableCell>
                      <Chip 
                        label={subject.status}
                        color={subject.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(subject)}
                          color="primary"
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(subject.id)}
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

      {/* Add/Edit Subject Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Subject' : 'Add New Subject'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Subject Name"
              fullWidth
              value={currentSubject.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              label="Subject Code"
              fullWidth
              placeholder="e.g., MATH501"
              value={currentSubject.code}
              onChange={(e) => handleChange('code', e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={currentSubject.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            <TextField
              label="Department"
              fullWidth
              value={currentSubject.department}
              onChange={(e) => handleChange('department', e.target.value)}
            />
            <TextField
              label="Level"
              select
              fullWidth
              value={currentSubject.level}
              onChange={(e) => handleChange('level', e.target.value)}
            >
              <MenuItem value="Form 1">Form 1</MenuItem>
              <MenuItem value="Form 2">Form 2</MenuItem>
              <MenuItem value="Form 3">Form 3</MenuItem>
              <MenuItem value="Form 4">Form 4</MenuItem>
              <MenuItem value="Form 5">Form 5</MenuItem>
            </TextField>
            <TextField
              label="Credits"
              type="number"
              fullWidth
              value={currentSubject.credits}
              onChange={(e) => handleChange('credits', parseInt(e.target.value) || 0)}
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={currentSubject.status}
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
            disabled={!currentSubject.name || !currentSubject.code || !currentSubject.department}
          >
            {editMode ? 'Update' : 'Add'} Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
