import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { PaymentRecordTable, PaymentRecordForm, PageHeader } from './components';

import {
  fetchPaymentRecords,
  createPaymentRecord,
  updatePaymentRecord,
  deletePaymentRecord,
  PaymentRecordData,
  PaymentRecordPayload,
} from './api';

const initialAllocation: PaymentRecordPayload = {
  studentName: '',
  studentIC: '',
  studentClass: '',
  payment_method: '',
  payment_reference: '',
  payment_receipt: '',
  selected_payments: [],
  total_payment: 0,
};


export default function PaymentRecord() {
  const [allocations, setAllocations] = useState<PaymentRecordData[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState<PaymentRecordPayload>(initialAllocation);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPaymentRecords()
      .then((allocationData) => {
        setAllocations(allocationData);
      })
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);



  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
  };

  const handleEdit = (allocation: PaymentRecordData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);
    setCurrentAllocation({
      studentName: allocation.studentName,
      studentIC: allocation.studentIC,
      studentClass: allocation.studentClass || '',
      payment_method: allocation.payment_method,
      payment_reference: allocation.payment_reference,
      payment_receipt: allocation.payment_receipt,
      selected_payments: allocation.selected_payments,
      total_payment: allocation.total_payment,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editMode && editingId !== null) {
        const updated = await updatePaymentRecord(editingId, currentAllocation);
        setAllocations(allocations.map(allocation =>
          allocation.id === editingId ? updated : allocation
        ));
      } else {
        const created = await createPaymentRecord(currentAllocation);
        setAllocations([...allocations, created]);
      }
      handleClose();
    } catch (e) {
      setError('Failed to save payment record');
    }
  };

  const handleDelete = async (id: number) => {
    await deletePaymentRecord(id);
    setAllocations(allocations.filter(allocation => allocation.id !== id));
  };




  const handleChange = (field: keyof PaymentRecordPayload, value: any) => {
    setCurrentAllocation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ...existing code...

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Payment Records">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <PaymentRecordTable 
              allocations={allocations} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </MainCard>
      </Grid>

      <PaymentRecordForm
        open={open}
        editMode={editMode}
        currentAllocation={currentAllocation}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Grid>
  );
}
