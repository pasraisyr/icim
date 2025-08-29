import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface DeleteConfirmDialogProps {
  open: boolean;
  studentName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog = ({ open, studentName, onClose, onConfirm }: DeleteConfirmDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Student</DialogTitle>
    <DialogContent>
      Are you sure you want to delete <b>{studentName}</b>?
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmDialog;
