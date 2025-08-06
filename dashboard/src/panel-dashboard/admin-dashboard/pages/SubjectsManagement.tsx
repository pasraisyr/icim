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
  status: 'active' | 'inactive';
}

// mock data
const mockSubjects: Subject[] = [
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
    name: 'Islamic Studies',
    status: 'active'
  },
  {
    id: '4',
    name: 'Arabic Language',
    status: 'inactive'
  }
];

const initialSubject: Omit<Subject, 'id'> = {
  name: '',
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
                Manage subject details, pricing, and availability
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
                        <Typography variant="subtitle2">{subject.name}</Typography>
                      </Stack>
                    </TableCell>
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
            disabled={!currentSubject.name}
          >
            {editMode ? 'Update' : 'Add'} Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
