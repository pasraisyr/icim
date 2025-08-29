import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface Subject {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface SubjectFormProps {
  open: boolean;
  editMode: boolean;
  currentSubject: Omit<Subject, 'id'>;
  onChange: (field: keyof Omit<Subject, 'id'>, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const SubjectForm = ({ open, editMode, currentSubject, onChange, onClose, onSave }: SubjectFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      {editMode ? 'Edit Subject' : 'Add New Subject'}
    </DialogTitle>
    <DialogContent>
      <Stack spacing={3} sx={{ mt: 1 }}>
        <TextField
          label="Subject Name"
          fullWidth
          value={currentSubject.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={currentSubject.status}
          onChange={(e) => onChange('status', e.target.value)}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        onClick={onSave} 
        variant="contained"
        disabled={!currentSubject.name}
      >
        {editMode ? 'Update' : 'Add'} Subject
      </Button>
    </DialogActions>
  </Dialog>
);

export default SubjectForm;
