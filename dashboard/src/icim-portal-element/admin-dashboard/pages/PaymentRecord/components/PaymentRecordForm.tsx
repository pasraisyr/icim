import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { PaymentRecordPayload, fetchStudents } from '../api';

interface PaymentRecordFormProps {
  open: boolean;
  editMode: boolean;
  currentAllocation: PaymentRecordPayload;
  onChange: (field: keyof PaymentRecordPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const PaymentRecordForm = ({
  open,
  editMode,
  currentAllocation,
  onChange,
  onClose,
  onSave
}: PaymentRecordFormProps) => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      fetchStudents()
        .then(setStudents)
        .catch(() => setStudents([]));
    }
  }, [open]);

  // Find selected student object
  const selectedStudent = students.find(s => s.studentName === currentAllocation.studentName);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? 'Edit Payment Record' : 'Add Payment Record'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Student Name Dropdown */}
          <TextField
            select
            label="Student Name"
            fullWidth
            value={currentAllocation.studentName || ''}
            onChange={e => {
              const name = e.target.value;
              const student = students.find(s => s.studentName === name);
              onChange('studentName', name);
              onChange('studentIC', student ? student.studentIC : '');
            }}
            SelectProps={{ MenuProps }}
          >
            {students.map(student => (
              <MenuItem key={student.id} value={student.studentName}>
                {student.studentName}
              </MenuItem>
            ))}
          </TextField>
          {/* Student IC auto-filled */}
          <TextField
            label="Student IC"
            fullWidth
            value={currentAllocation.studentIC || ''}
            onChange={e => onChange('studentIC', e.target.value)}
            disabled
          />
          <TextField
            label="Student Class"
            fullWidth
            value={currentAllocation.studentClass || ''}
            onChange={e => onChange('studentClass', e.target.value)}
          />
          <TextField
            select
            label="Payment Method"
            fullWidth
            value={currentAllocation.payment_method || ''}
            onChange={e => onChange('payment_method', e.target.value)}
          >
            <MenuItem value="Online Banking">Online Banking</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </TextField>
          <TextField
            label="Payment Reference"
            fullWidth
            value={currentAllocation.payment_reference || ''}
            onChange={e => onChange('payment_reference', e.target.value)}
          />
          <TextField
            label="Total Payment"
            type="number"
            fullWidth
            value={currentAllocation.total_payment || 0}
            onChange={e => onChange('total_payment', parseFloat(e.target.value))}
          />
          {/* File upload for payment_receipt */}
          <Button
            variant="outlined"
            component="label"
          >
            Upload Receipt
            <input
              type="file"
              hidden
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  onChange('payment_receipt', e.target.files[0]);
                }
              }}
            />
          </Button>
          {/* selected_payments as dynamic month/amount fields */}
          <Stack spacing={2}>
            {(currentAllocation.selected_payments || []).map((payment, idx) => (
              <Stack direction="row" spacing={2} key={idx} alignItems="center">
                <TextField
                  select
                  label="Month"
                  value={payment.type || ""}
                  onChange={e => {
                    const updated = [...currentAllocation.selected_payments];
                    updated[idx].type = e.target.value;
                    onChange('selected_payments', updated);
                  }}
                  sx={{ minWidth: 120 }}
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Amount"
                  type="number"
                  value={payment.amount || ""}
                  onChange={e => {
                    const updated = [...currentAllocation.selected_payments];
                    updated[idx].amount = parseFloat(e.target.value);
                    onChange('selected_payments', updated);
                  }}
                  sx={{ minWidth: 100 }}
                />
                <Button
                  color="error"
                  onClick={() => {
                    const updated = currentAllocation.selected_payments.filter((_, i) => i !== idx);
                    onChange('selected_payments', updated);
                  }}
                >
                  Remove
                </Button>
              </Stack>
            ))}
            <Button
              variant="outlined"
              onClick={() => {
                onChange('selected_payments', [
                  ...(currentAllocation.selected_payments || []),
                  { type: "", amount: 0 }
                ]);
              }}
            >
              Add Payment
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={
            !currentAllocation.studentName || 
            !currentAllocation.studentIC ||
            !currentAllocation.payment_method ||
            !currentAllocation.payment_reference
          }
        >
          {editMode ? 'Update' : 'Add'} Payment Record
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentRecordForm;
