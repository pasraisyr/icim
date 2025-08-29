import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TeacherPayload } from '../api';

interface TeacherFormProps {
  open: boolean;
  editMode: boolean;
  currentTeacher: TeacherPayload;
  onChange: (field: keyof TeacherPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const TeacherForm = ({ open, editMode, currentTeacher, onChange, onClose, onSave }: TeacherFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{editMode ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
    <DialogContent>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={currentTeacher.name}
        onChange={e => onChange('name', e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={currentTeacher.email}
        onChange={e => onChange('email', e.target.value)}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        value={currentTeacher.phone}
        onChange={e => onChange('phone', e.target.value)}
      />
      <TextField
        label="Join Date"
        type="date"
        fullWidth
        margin="normal"
        value={currentTeacher.joinDate}
        onChange={e => onChange('joinDate', e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave} variant="contained" disabled={!currentTeacher.name || !currentTeacher.email}>
        {editMode ? 'Update' : 'Add'} Teacher
      </Button>
    </DialogActions>
  </Dialog>
);

export default TeacherForm;
