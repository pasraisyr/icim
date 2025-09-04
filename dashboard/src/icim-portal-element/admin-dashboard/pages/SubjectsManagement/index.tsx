import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { SubjectForm, SubjectsTable, PageHeader, DeleteConfirmDialog } from './components';
import { fetchSubjects, createSubject, updateSubject, deleteSubject, Subject, SubjectPayload } from './api';

const initialSubject: SubjectPayload = { 
  id: 0, 
  name: '', 
  status: 'active' 
  
};

export default function SubjectsManagement() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<SubjectPayload>(initialSubject);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSubjects()
      .then(data => setSubjects(data))
      .catch(() => setError('Failed to fetch subjects'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentSubject(initialSubject);
    setEditingId(null);
  };

  const handleEdit = (subject: Subject) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(subject.id);
    setCurrentSubject({ id: subject.id, name: subject.name, status: subject.status });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentSubject(initialSubject);
    setEditingId(null);
  };

  // Show confirmation dialog before deleting
  const handleDelete = (id: number) => {
    const subject = subjects.find(s => s.id === id) || null;
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (subjectToDelete) {
      setError(null);
      try {
        await deleteSubject(subjectToDelete.id);
        setSubjects(subjects.filter(subject => subject.id !== subjectToDelete.id));
      } catch (e) {
        setError('Failed to delete subject');
      }
      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSubjectToDelete(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editMode && editingId !== null) {
        const payload: SubjectPayload = {
          id: editingId,
          name: currentSubject.name,
          status: currentSubject.status
        };
        const updated = await updateSubject(payload);
        setSubjects(subjects.map(s => (s.id === editingId ? updated : s)));
      } else {
        // For create, remove id from payload if not needed
        const { id, ...createPayload } = currentSubject;
        const created = await createSubject(createPayload as SubjectPayload);
        setSubjects([...subjects, created]);
      }
      handleClose();
    } catch (e) {
      setError('Failed to save subject');
    }
  };

  const handleChange = (field: keyof SubjectPayload, value: string) => {
    setCurrentSubject({ ...currentSubject, [field]: value });
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
            <SubjectsTable subjects={subjects} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </MainCard>
      </Grid>
      <SubjectForm
        open={open}
        editMode={editMode}
        currentSubject={currentSubject}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        subjectName={subjectToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
