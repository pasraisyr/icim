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
const days = ['Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu','Ahad'];
const times = [
  '8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'
];

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
        />
        <FormControl fullWidth>
          <InputLabel>Subjects</InputLabel>
          <Select
            multiple
            value={currentClass.subject_ids}
            onChange={e => onChange('subject_ids', e.target.value)}
            input={<OutlinedInput label="Subjects" />}
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
          <InputLabel>Schedule Day</InputLabel>
          <Select
            value={currentClass.scheduleDay}
            onChange={e => onChange('scheduleDay', e.target.value)}
            label="Schedule Day"
          >
            {days.map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Start Time</InputLabel>
            <Select
              value={currentClass.startTime}
              onChange={e => onChange('startTime', e.target.value)}
              label="Start Time"
            >
              {times.map(time => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>End Time</InputLabel>
            <Select
              value={currentClass.endTime}
              onChange={e => onChange('endTime', e.target.value)}
              label="End Time"
            >
              {times.map(time => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={currentClass.price}
          onChange={e => onChange('price', Number(e.target.value))}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={currentClass.status}
            onChange={e => onChange('status', e.target.value)}
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
      <Button onClick={onSave} variant="contained" disabled={!currentClass.name}>
        {editMode ? 'Update' : 'Add'} Class
      </Button>
    </DialogActions>
  </Dialog>
);

export default ClassForm;
