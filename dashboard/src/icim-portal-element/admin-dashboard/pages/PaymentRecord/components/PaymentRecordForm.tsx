import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Student } from "../../StudentsManagement/api";
import { PaymentRecordPayload } from "../api";
import { Class } from '../../ClassesManagement/api';

interface PaymentRecordFormProps {
  open: boolean;
  editMode: boolean;
  currentAllocation: PaymentRecordPayload;
  onChange: (field: keyof PaymentRecordPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
  students: Student[];
  classrooms: Class[];
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
  onSave,
  students,
  classrooms
}: PaymentRecordFormProps) => {
  // Ensure selected_payments is always an array
  const selected_payments = Array.isArray(currentAllocation.selected_payments)
  ? currentAllocation.selected_payments
  : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? 'Edit Payment Record' : 'Add Payment Record'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Student Dropdown by ID */}
          <TextField
            select
            label="Student"
            fullWidth
            required
            value={currentAllocation.student_id || ''}
            onChange={e => {
              const id = Number(e.target.value);
              onChange('student_id', id);
            }}
            SelectProps={{ MenuProps }}
            helperText="Select a student"
          >
            {students.map(student => (
              <MenuItem key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </MenuItem>
            ))}
          </TextField>
         
          <TextField
            select
            label="Class Package"
            fullWidth
           
            value={currentAllocation.class_package ?? ''}
            onChange={e => onChange('class_package', Number(e.target.value))}
            helperText="Select a class package"
          >
            {classrooms.map(classroom => (
              <MenuItem key={classroom.id} value={classroom.id}>
                {classroom.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Payment Method"
            fullWidth
            required
            value={currentAllocation.payment_method || ''}
            onChange={e => onChange('payment_method', e.target.value)}
            helperText="Select payment method"
          >
            <MenuItem value="Online Banking">Online Banking</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </TextField>
          {/* Payment Reference */}
          <TextField
            label="Payment Reference"
            fullWidth
            required
            value={currentAllocation.payment_reference || ''}
            onChange={e => onChange('payment_reference', e.target.value)}
            helperText="Enter payment reference"
          />
          {/* Total Payment */}
          <TextField
            label="Total Payment"
            type="number"
            fullWidth
            required
            value={currentAllocation.total_payment ?? 0}
            onChange={e => onChange('total_payment', parseFloat(e.target.value))}
            inputProps={{ min: 0 }}
            helperText="Enter total payment amount"
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
            {selected_payments.map((payment, idx) => (
              <Stack direction="row" spacing={2} key={idx} alignItems="center">
                <TextField
                  select
                  label="Month"
                  value={payment.type || ""}
                  onChange={e => {
                    const updated = [...selected_payments];
                    updated[idx].type = e.target.value;
                    onChange('selected_payments', updated);
                  }}
                  sx={{ minWidth: 120 }}
                  required
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Amount"
                  type="number"
                  value={payment.amount ?? ""}
                  onChange={e => {
                    const updated = [...selected_payments];
                    updated[idx].amount = parseFloat(e.target.value);
                    onChange('selected_payments', updated);
                  }}
                  sx={{ minWidth: 100 }}
                  required
                  inputProps={{ min: 0 }}
                />
                <Button
                  color="error"
                  onClick={() => {
                    const updated = selected_payments.filter((_, i) => i !== idx);
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
                  ...selected_payments,
                  { type: "", amount: 0 }
                ]);
              }}
            >
              Add Payment
            </Button>
          </Stack>
          {/* Class Package Dropdown */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={
            !currentAllocation.student_id ||
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
