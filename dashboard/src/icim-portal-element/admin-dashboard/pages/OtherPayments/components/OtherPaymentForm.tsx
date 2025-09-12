import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface OtherPayment {
  id: string;
  name: string;
  price: number;
  status: boolean;
}

interface OtherPaymentFormProps {
  open: boolean;
  editMode: boolean;
  currentOtherPayment: Omit<OtherPayment, 'id'>;
  onChange: (field: keyof Omit<OtherPayment, 'id'>, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const OtherPaymentForm = ({ open, editMode, currentOtherPayment, onChange, onClose, onSave }: OtherPaymentFormProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      {editMode ? 'Edit Other Payment' : 'Add New Other Payment'}
    </DialogTitle>
    <DialogContent>
      <Stack spacing={3} sx={{ mt: 1 }}>
        <TextField
          label="Payment Name"
          fullWidth
          value={currentOtherPayment.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <TextField
          label="Price"
          fullWidth
          value={currentOtherPayment.price}
          onChange={(e) => onChange('price', e.target.value)}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={currentOtherPayment.status}
          onChange={(e) => onChange('status', e.target.value)}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
        </TextField>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        onClick={onSave} 
        variant="contained"
        disabled={!currentOtherPayment.name}
      >
        {editMode ? 'Update' : 'Add'} Other Payment
      </Button>
    </DialogActions>
  </Dialog>
);

export default OtherPaymentForm;
