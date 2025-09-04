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
        label="First Name"
        fullWidth
        margin="normal"
        value={currentTeacher.first_name}
        onChange={e => onChange('first_name', e.target.value)}
      />
      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        value={currentTeacher.last_name}
        onChange={e => onChange('last_name', e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={currentTeacher.email}
        onChange={e => onChange('email', e.target.value)}
      />
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={currentTeacher.phone_number}
        onChange={e => onChange('phone_number', e.target.value)}
      />
      <TextField
        label="Position"
        fullWidth
        margin="normal"
        value={currentTeacher.position}
        onChange={e => onChange('position', e.target.value)}
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
      <TextField
        label="Status"
        fullWidth
        margin="normal"
        value={currentTeacher.status}
        onChange={e => onChange('status', e.target.value)}
        select
        SelectProps={{ native: true }}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </TextField>
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={currentTeacher.password}
        onChange={e => onChange('password', e.target.value)}
      />
      {/* Hidden field for position, always set to teacher */}
      <input type="hidden" value={currentTeacher.position || 'teacher'} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button
        onClick={onSave}
        variant="contained"
        disabled={
          !currentTeacher.first_name ||
          !currentTeacher.last_name ||
          !currentTeacher.email ||
          !currentTeacher.phone_number ||
          !currentTeacher.position
        }
      >
        {editMode ? 'Update' : 'Add'} Teacher
      </Button>
    </DialogActions>
  </Dialog>
);

export default TeacherForm;
