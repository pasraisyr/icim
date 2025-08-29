import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface About {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
}

interface AboutFormProps {
  open: boolean;
  editMode: boolean;
  currentAbout: Omit<About, 'id'>;
  onChange: (field: keyof Omit<About, 'id'>, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const AboutForm = ({ open, editMode, currentAbout, onChange, onClose, onSave }: AboutFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      {editMode ? 'Edit About' : 'Add New About'}
    </DialogTitle>
    <DialogContent>
      <Stack spacing={3} sx={{ mt: 1 }}>
        <TextField
          label="About Title"
          fullWidth
          value={currentAbout.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <TextField
          label="About Description"
          fullWidth
          multiline
          rows={4}
          value={currentAbout.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={currentAbout.status}
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
        disabled={!currentAbout.title}
      >
        {editMode ? 'Update' : 'Add'} About
      </Button>
    </DialogActions>
  </Dialog>
);

export default AboutForm;
