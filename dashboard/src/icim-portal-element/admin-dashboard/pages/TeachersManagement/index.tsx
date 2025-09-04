import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher, Teacher, TeacherPayload } from './api';
import { TeachersTable, TeacherForm, PageHeader, DeleteConfirmDialog } from './components';

const initialTeacher: TeacherPayload = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  password: '', // <-- Add this
  phone_number: '',
  status: 'active',
  joinDate: '',
  position: 'teacher',
};

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherPayload>(initialTeacher);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTeachers()
      .then(setTeachers)
      .catch(err => setError('Failed to fetch teachers'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
    setEditingId(null);
  };

  const handleEdit = (teacher: Teacher) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(teacher.id);
    setCurrentTeacher({
      id: teacher.id,
      password: teacher.password,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      phone_number: teacher.phone_number,
      status: teacher.status,
      joinDate: teacher.joinDate,
      position: teacher.position,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (editMode && editingId !== null) {
      const payload: TeacherPayload = {
        id: editingId,
        password: currentTeacher.password,
        first_name: currentTeacher.first_name,
        last_name: currentTeacher.last_name,
        email: currentTeacher.email,
        phone_number: currentTeacher.phone_number,
        status: currentTeacher.status,
        joinDate: currentTeacher.joinDate,
        position: currentTeacher.position,
      };
      console.log('Update payload:', payload);
      const updated = await updateTeacher(payload);
      setTeachers(teachers.map(t => (t.id === editingId ? updated : t)));
    } else {
      const {id, ...createPayload} = currentTeacher;
      console.log('Create payload:', createPayload);
      const created = await createTeacher(createPayload as TeacherPayload);
      setTeachers([...teachers, created]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    const teacher = teachers.find(t => t.id === id) || null;
    setTeacherToDelete(teacher);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (teacherToDelete) {
      setError(null);
      try {
        await deleteTeacher(teacherToDelete.id);
        setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
      } catch (e) {
        setError('Failed to delete teacher');
      }
      setDeleteDialogOpen(false);
      setTeacherToDelete(null);
    }
  };


  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setTeacherToDelete(null);
  };

  const handleChange = (field: keyof TeacherPayload, value: any) => {
    setCurrentTeacher({ ...currentTeacher, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Teachers List">
            {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
          <TeachersTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </MainCard>
      </Grid>
      <TeacherForm 
        open={open}
        editMode={editMode}
        currentTeacher={currentTeacher}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        teacherName={`${teacherToDelete?.first_name || ''} ${teacherToDelete?.last_name || ''}`}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
