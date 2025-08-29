import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StudentPayload } from '../api';


interface ClassOption {
  id: string;
  name: string;
}

interface StudentFormProps {
  open: boolean;
  editMode: boolean;
  currentStudent: StudentPayload;
  availableClasses: ClassOption[];
  onChange: (field: keyof StudentPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const StudentForm = ({ open, editMode, currentStudent,availableClasses, onChange, onClose, onSave }: StudentFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{editMode ? 'Edit Student' : 'Add New Student'}</DialogTitle>
    <DialogContent>
      {/* ID field (read-only, only in edit mode) */}
      {editMode && (
        <TextField
          label="ID"
          fullWidth
          margin="normal"
          value={currentStudent.id || ''}
          InputProps={{ readOnly: true }}
        />
      )}
      <TextField
        label="Guardian Name"
        fullWidth
        margin="normal"
        value={currentStudent.guardianName}
        onChange={e => onChange('guardianName', e.target.value)}
      />
      <TextField
        label="Guardian IC"
        fullWidth
        margin="normal"
        value={currentStudent.guardianIC}
        onChange={e => onChange('guardianIC', e.target.value)}
      />
      <TextField
        label="Guardian Phone"
        fullWidth
        margin="normal"
        value={currentStudent.guardianPhone}
        onChange={e => onChange('guardianPhone', e.target.value)}
      />
      <TextField
        label="Student Name"
        fullWidth
        margin="normal"
        value={currentStudent.studentName}
        onChange={e => onChange('studentName', e.target.value)}
      />
      <TextField
        label="Student IC"
        fullWidth
        margin="normal"
        value={currentStudent.studentIC}
        onChange={e => onChange('studentIC', e.target.value)}
      />
      <TextField
        label="Address"
        fullWidth
        margin="normal"
        value={currentStudent.address}
        onChange={e => onChange('address', e.target.value)}
      />
      <TextField
        label="Level"
        fullWidth
        margin="normal"
        value={currentStudent.level}
        onChange={e => onChange('level', e.target.value)}
      />
      <TextField
        label="Status"
        select
        fullWidth
        margin="normal"
        value={currentStudent.status}
        onChange={e => onChange('status', e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </TextField>
      <TextField
        label="Enrollment Date"
        type="date"
        fullWidth
        margin="normal"
        value={currentStudent.enrollmentDate}
        onChange={e => onChange('enrollmentDate', e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave} variant="contained" disabled={!currentStudent.studentName}>
        {editMode ? 'Update' : 'Add'} Student
      </Button>
    </DialogActions>
  </Dialog>
);

export default StudentForm;
