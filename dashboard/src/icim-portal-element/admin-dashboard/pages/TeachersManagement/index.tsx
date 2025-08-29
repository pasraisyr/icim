import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher, Teacher, TeacherPayload } from './api';
import { TeachersTable, TeacherForm, PageHeader, DeleteConfirmDialog } from './components';

const initialTeacher: TeacherPayload = {
  name: '',
  email: '',
  phone: '',
  status: 'active',
  joinDate: '',
  role: 'teacher', 
};

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherPayload>(initialTeacher);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  useEffect(() => {
    fetchTeachers().then(setTeachers);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
  };

  const handleEdit = (teacher: Teacher) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(teacher.id);
    setCurrentTeacher({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      status: teacher.status,
      joinDate: teacher.joinDate,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentTeacher(initialTeacher);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (editMode && editingId) {
      const updated = await updateTeacher(editingId, currentTeacher);
      setTeachers(teachers.map(t => (t.id === editingId ? updated : t)));
    } else {
      const created = await createTeacher(currentTeacher);
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
      await deleteTeacher(teacherToDelete.id);
      setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
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
          <TeachersTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
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
        teacherName={teacherToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
