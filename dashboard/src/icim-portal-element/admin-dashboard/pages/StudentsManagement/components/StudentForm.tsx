import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StudentPayload } from '../api';

interface StudentFormProps {
  open: boolean;
  editMode: boolean;
  currentStudent: StudentPayload;
  onChange: (field: keyof StudentPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const StudentForm = ({ open, editMode, currentStudent,onChange, onClose, onSave }: StudentFormProps) => (
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
        label="Student's First Name"
        fullWidth
        margin="normal"
        value={currentStudent.first_name}
        onChange={e => onChange('first_name', e.target.value)}
      />
      <TextField
        label="Student's Last Name"
        fullWidth
        margin="normal"
        value={currentStudent.last_name}
        onChange={e => onChange('last_name', e.target.value)}
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
        select
        fullWidth
        margin="normal"
        value={currentStudent.level}
        onChange={e => onChange('level', e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="">Select Level</option>
        <option value="Tahap Rendah">Tahap Rendah</option>
        <option value="Tahap Menengah">Tahap Menengah</option>
        <option value="Kelas Tuisyen">Kelas Tuisyen</option>
        <option value="Aktiviti Kokurikulum">Aktiviti Kokurikulum</option>
      </TextField>
      <TextField
        label="Class Method"
        select
        fullWidth
        margin="normal"
        value={currentStudent.class_method}
        onChange={e => onChange('class_method', e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="Physical Classes">Physical Classes</option>
        <option value="Online Classes">Online Classes</option>
        <option value="Hybrid Classes">Hybrid Classes</option>
        <option value="Weekend Classes">Weekend Classes</option>
      </TextField>

      <TextField
        label="Total Fees"
        type="number"
        fullWidth
        margin="normal"
        value={currentStudent.total_fees}
        onChange={e => onChange('total_fees', Number(e.target.value))}
      />
      <TextField
        label="Initial Payment"
        type="number"
        fullWidth
        margin="normal"
        value={currentStudent.initial_payment}
        onChange={e => onChange('initial_payment', Number(e.target.value))}
      />
      <TextField
        label="Payment Reference"
        fullWidth
        margin="normal"
        value={currentStudent.payment_reference || ''}
        onChange={e => onChange('payment_reference', e.target.value)}
      />
      <TextField
        label="Payment Method"
        select
        fullWidth
        margin="normal"
        value={currentStudent.payment_method }
        onChange={e => onChange('payment_method', e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="Cash">Cash</option>
        <option value="Online Banking">Online Banking</option>
      </TextField>
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={currentStudent.password || "Icim@2025"}
        onChange={e => onChange('password', e.target.value)}
        style={{ display: 'none' }} // Hide the field from UI
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
      <Button onClick={onSave} variant="contained" disabled={!currentStudent.first_name || !currentStudent.last_name}>
        {editMode ? 'Update' : 'Add'} Student
      </Button>
    </DialogActions>
  </Dialog>
);

export default StudentForm;
