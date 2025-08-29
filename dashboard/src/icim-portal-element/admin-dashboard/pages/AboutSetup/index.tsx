import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { SubjectForm, SubjectsTable, PageHeader, DeleteConfirmDialog } from './components';
import {  About, AboutPayload, createAbout, deleteAbout, fetchAbouts, updateAbout } from './api';
import AboutsTable from './components/Table';

const initialAbout: AboutPayload = { title: '', description: '', status: 'active' };

export default function FrontendManagement() {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAbout, setCurrentAbout] = useState<AboutPayload>(initialAbout);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [aboutToDelete, setAboutToDelete] = useState<About | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAbouts()
      .then(data => setAbouts(data))
      .catch(() => setError('Failed to fetch abouts'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAbout(initialAbout);
  };

  const handleEdit = (about: About) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(about.id);
    setCurrentAbout({ title: about.title, description: about.description, status: about.status });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAbout(initialAbout);
    setEditingId(null);
  };

  // Show confirmation dialog before deleting
  const handleDelete = (id: number) => {
    const about = abouts.find(s => s.id === id) || null;
    setAboutToDelete(about);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (aboutToDelete) {
      setError(null);
      try {
        await deleteAbout(aboutToDelete.id);
        setAbouts(abouts.filter(about => about.id !== aboutToDelete.id));
      } catch (e) {
        setError('Failed to delete about');
      }
      setDeleteDialogOpen(false);
      setAboutToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAboutToDelete(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editMode && editingId !== null) {
        const updated = await updateAbout(editingId, currentAbout);
        setAbouts(abouts.map(s => (s.id === editingId ? updated : s)));
      } else {
        const created = await createAbout(currentAbout);
        setAbouts([...abouts, created]);
      }
      handleClose();
    } catch (e) {
      setError('Failed to save about');
    }
  };

  const handleChange = (field: keyof AboutPayload, value: string) => {
    setCurrentAbout({ ...currentAbout, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Subjects List">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <AboutsTable abouts={abouts} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </MainCard>
      </Grid>
      <SubjectForm 
        open={open}
        editMode={editMode}
        currentAbout={currentAbout}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        aboutTitle={aboutToDelete?.title || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
