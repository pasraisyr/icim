import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import { ClassPayload } from '../api';

interface SubjectOption {
  id: number;
  name: string;
}

interface ClassFormProps {
  open: boolean;
  editMode: boolean;
  currentClass: ClassPayload;
  availableSubjects: SubjectOption[];
  onChange: (field: keyof ClassPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const levels = ['Tahap Rendah', 'Tahap Menengah', 'Kelas Tuisyen', 'Aktiviti Kokurikulum'];
const days = ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'];

const ClassForm = ({ open, editMode, currentClass, availableSubjects, onChange, onClose, onSave }: ClassFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{editMode ? 'Edit Class' : 'Add New Class'}</DialogTitle>
    <DialogContent>
      <Stack spacing={3} sx={{ mt: 1 }}>
        <TextField
          label="Class Name"
          fullWidth
          value={currentClass.name}
          onChange={e => onChange('name', e.target.value)}
          required
        />
        
        <FormControl fullWidth>
          <InputLabel>Subjects *</InputLabel>
          <Select
            multiple
            value={currentClass.subject_ids}
            onChange={e => onChange('subject_ids', e.target.value)}
            input={<OutlinedInput label="Subjects *" />}
            renderValue={(selected) =>
              (selected as number[]).map(id => {
                const subj = availableSubjects.find(s => s.id === id);
                return subj ? subj.name : id;
              }).join(', ')
            }
          >
            {availableSubjects.map(subject => (
              <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth>
          <InputLabel>Level</InputLabel>
          <Select
            value={currentClass.level}
            onChange={e => onChange('level', e.target.value)}
            label="Level"
          >
            {levels.map(level => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth>
          <InputLabel>Schedule Days</InputLabel>
          <Select
            multiple
            value={currentClass.scheduleDay}
            onChange={e => onChange('scheduleDay', e.target.value)}
            input={<OutlinedInput label="Schedule Days" />}
            renderValue={(selected) =>
              (selected as string[]).join(', ')
            }
          >
            {days.map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Stack direction="row" spacing={2}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={currentClass.startTime}
            onChange={e => onChange('startTime', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min intervals
            }}
            required
          />
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={currentClass.endTime}
            onChange={e => onChange('endTime', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min intervals
            }}
            required
          />
        </Stack>
        
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={currentClass.price}
          onChange={e => {
            const value = e.target.value;
            // Convert to float, default to 0.0 if empty or invalid
            const floatValue = value === '' ? 0.0 : parseFloat(value);
            onChange('price', isNaN(floatValue) ? 0.0 : floatValue);
          }}
          inputProps={{
            min: 0,
            step: 0.01
          }}
          required
        />
        
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={currentClass.statuse}
            onChange={e => onChange('statuse', e.target.value)}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        onClick={onSave} 
        variant="contained" 
        disabled={!currentClass.name || currentClass.subject_ids.length === 0 || !currentClass.startTime || !currentClass.endTime}
      >
        {editMode ? 'Update' : 'Add'} Class
      </Button>
    </DialogActions>
  </Dialog>
);

export default ClassForm;
