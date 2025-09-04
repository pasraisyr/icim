import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { ClassesTable, ClassForm, PageHeader, DeleteConfirmDialog } from './components';
import { fetchClasses, createClass, updateClass, deleteClass, Class, ClassPayload } from './api';

import { fetchSubjects, Subject } from './api';

const initialClass: ClassPayload = {
  name: '',
  subject_ids: [],
  level: 'Primary',
  scheduleDay: '',
  startTime: '',
  endTime: '',
  price: 0,
  status: 'active',
};

export default function ClassesManagement() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassPayload>(initialClass);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<Class | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchClasses(), fetchSubjects()])
      .then(([classData, subjectData]) => {
        setClasses(classData);
        setAvailableSubjects(subjectData);
        console.log('Subjects:', subjectData); // <-- Add this line
      })
      .catch(() => setError('Failed to fetch classes or subjects'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentClass(initialClass);
  };

  const handleEdit = (cls: Class) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(cls.id);
    setCurrentClass({
      name: cls.name,
      subject_ids: cls.subjects.map(s => s.id),
      level: cls.level,
      scheduleDay: cls.scheduleDay,
      startTime: cls.startTime,
      endTime: cls.endTime,
      price: cls.price,
      status: cls.status,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentClass(initialClass);
    setEditingId(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editMode && editingId !== null) {
        const updated = await updateClass(editingId, currentClass);
        setClasses(classes.map(c => (c.id === editingId ? updated : c)));
      } else {
        const created = await createClass(currentClass);
        setClasses([...classes, created]);
      }
      handleClose();
    } catch (e) {
      setError('Failed to save class');
    }
  };

  const handleDelete = (id: number) => {
    const cls = classes.find(c => c.id === id) || null;
    setClassToDelete(cls);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (classToDelete) {
      setError(null);
      try {
        await deleteClass(classToDelete.id);
        setClasses(classes.filter(c => c.id !== classToDelete.id));
      } catch (e) {
        setError('Failed to delete class');
      }
      setDeleteDialogOpen(false);
      setClassToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setClassToDelete(null);
  };

  const handleChange = (field: keyof ClassPayload, value: any) => {
    setCurrentClass({ ...currentClass, [field]: value });
  };

  // Helper to get subject names from subject objects
  const getSubjectNames = (subjects: Subject[]): string => {
    return subjects.map(s => s.name).join(', ');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Classes List">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <ClassesTable classes={classes} onEdit={handleEdit} onDelete={handleDelete} getSubjectNames={getSubjectNames} />
          )}
        </MainCard>
      </Grid>
      <ClassForm 
        open={open}
        editMode={editMode}
        currentClass={currentClass}
        availableSubjects={availableSubjects}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        className={classToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
