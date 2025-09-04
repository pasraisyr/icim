import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { ClassesTable, ClassForm, PageHeader, DeleteConfirmDialog } from './components';
import { fetchClasses, createClass, updateClass, deleteClass, Class, ClassPayload } from './api';

import { fetchSubjects, Subject } from './api';

const initialClass: ClassPayload = {
  id: 0,
  name: '',
  subject_ids: [],
  level: 'Tahap Rendah', // Changed from 'Primary'
  scheduleDay: [],
  startTime: '',
  endTime: '',
  price: 0,
  statuse: 'active',
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
      })
      .catch((err) => {
        console.error('Fetch error:', err); // Debug line
        setError('Failed to fetch classes or subjects');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentClass(initialClass);
    setEditingId(null);
  };

  const handleEdit = (cls: Class) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(cls.id);
    setCurrentClass({
      id: cls.id,
      name: cls.name,
      subject_ids: cls.subjects.map(s => s.id),
      level: cls.level,
      scheduleDay: Array.isArray(cls.scheduleDay) ? cls.scheduleDay : [], 
      startTime: cls.startTime,
      endTime: cls.endTime,
      price: cls.price,
      statuse: cls.statuse, 
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
        const payload: ClassPayload = {
          id: editingId,
          name: currentClass.name,
          subject_ids: currentClass.subject_ids,
          level: currentClass.level,
          scheduleDay: currentClass.scheduleDay,
          startTime: currentClass.startTime.slice(0, 5), // <-- Only HH:MM
          endTime: currentClass.endTime.slice(0, 5),     // <-- Only HH:MM
          price: currentClass.price,
          statuse: currentClass.statuse,
        };
        console.log('Payload sent to updateClass:', payload);
        const updated = await updateClass(payload);
        setClasses(classes.map(c => (c.id === editingId ? updated : c)));
      } else {
        const {id, ...createPayload} = currentClass; // Exclude id for creation
        const created = await createClass(createPayload as ClassPayload);
        setClasses([...classes, created]);
      }
      handleClose();
    } catch (e) {
      console.error('Save error:', e); // Debug line
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
        console.error('Delete error:', e); // Debug line
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

  const handleChange = (field: keyof ClassPayload, value: string) => {
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
