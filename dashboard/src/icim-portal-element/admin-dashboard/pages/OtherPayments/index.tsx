import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { OtherPaymentForm, OtherPaymentTable, PageHeader, DeleteConfirmDialog } from './components';
import { fetchOtherPayment,createOtherPayment,updateOtherPayment,deleteOtherPayment,OtherPayment, OtherPaymentPayload} from './api';
import { set } from 'date-fns';

const initialOtherPayment: OtherPaymentPayload = {
  id: 0,
  name: '',
  price: 0,
  status: false
  
};

export default function OtherPayments() {
  const [otherPayments, setOtherPayments] = useState<OtherPayment[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOtherPayment, setCurrentOtherPayment] = useState<OtherPaymentPayload>(initialOtherPayment);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [otherPaymentToDelete, setOtherPaymentToDelete] = useState<OtherPayment | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchOtherPayment()
      .then(data => setOtherPayments(data))
      .catch(() => setError('Failed to fetch other payments'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentOtherPayment(initialOtherPayment);
    setEditingId(null);
  };

  const handleEdit = (otherPayment: OtherPayment) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(otherPayment.id);
    setCurrentOtherPayment({ id: otherPayment.id, name: otherPayment.name, price: otherPayment.price, status: otherPayment.status });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentOtherPayment(initialOtherPayment);
    setEditingId(null);
  };

  // Show confirmation dialog before deleting
  const handleDelete = (id: number) => {
    const otherPayment = otherPayments.find(s => s.id === id) || null;
    setOtherPaymentToDelete(otherPayment);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (otherPaymentToDelete) {
      setError(null);
      try {
        await deleteOtherPayment(otherPaymentToDelete.id);
        setOtherPayments(otherPayments.filter(otherPayment => otherPayment.id !== otherPaymentToDelete.id));
      } catch (e) {
        setError('Failed to delete other payment');
      }
      setDeleteDialogOpen(false);
      setOtherPaymentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setOtherPaymentToDelete(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editMode && editingId !== null) {
        const payload: OtherPaymentPayload = {
          id: editingId,
          name: currentOtherPayment.name,
          price: currentOtherPayment.price,
          status: currentOtherPayment.status
        };
        const updated = await updateOtherPayment(payload);
        setOtherPayments(otherPayments.map(s => (s.id === editingId ? updated : s)));
      } else {
        // For create, remove id from payload if not needed
        const { id, ...createPayload } = currentOtherPayment;
        const created = await createOtherPayment(createPayload as OtherPaymentPayload);
        setOtherPayments([...otherPayments, created]);
      }
      handleClose();
    } catch (e) {
      setError('Failed to save other payment');
    }
  };

  const handleChange = (field: keyof OtherPaymentPayload, value: string) => {
    setCurrentOtherPayment({ ...currentOtherPayment, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Other Payments">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <OtherPaymentTable otherPayments={otherPayments} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </MainCard>
      </Grid>
      <OtherPaymentForm
        open={open}
        editMode={editMode}
        currentOtherPayment={currentOtherPayment}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        name={otherPaymentToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
