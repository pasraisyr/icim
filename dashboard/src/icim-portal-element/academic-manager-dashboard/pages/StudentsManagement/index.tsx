import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { fetchStudents, createStudent, updateStudent, deleteStudent, Student, StudentPayload } from './api';
import { StudentsTable, StudentForm, PageHeader, DeleteConfirmDialog } from './components';

const initialStudent: StudentPayload = {
  id: 0,
  guardianName: '',
  guardianIC: '',
  guardianPhone: '',
  studentName: '',
  studentIC: '',
  address: '',
  level: '',
  status: 'active',
  enrollmentDate: '',
};

import { fetchClasses } from './api';

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentPayload>(initialStudent);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableClasses, setAvailableClasses] = useState<{ id: string; name: string }[]>([]);


  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchStudents(), fetchClasses()])
      .then(([studentData, classData]) => {
        setStudents(studentData);
        setAvailableClasses(classData.map(cls => ({ ...cls, id: String(cls.id) })));
      })
      .catch(() => setError('Failed to fetch classes or subjects'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentStudent(initialStudent);
    setEditingId(null);
  };

  const handleEdit = (student: Student) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(student.id);
    setCurrentStudent({
      id: student.id,
      guardianName: student.guardianName,
      guardianIC: student.guardianIC,
      guardianPhone: student.guardianPhone,
      studentName: student.studentName,
      studentIC: student.studentIC,
      address: student.address,
      level: student.level,
      status: student.status,
      enrollmentDate: student.enrollmentDate,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentStudent(initialStudent);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (editMode && editingId) {
      const updated = await updateStudent(editingId, currentStudent);
      setStudents(students.map(s => (s.id === editingId ? updated : s)));
    } else {
      const created = await createStudent(currentStudent);
      setStudents([...students, created]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    const student = students.find(s => s.id === id) || null;
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete.id);
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleChange = (field: keyof StudentPayload, value: any) => {
    setCurrentStudent({ ...currentStudent, [field]: value });
  };



  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Students List">
          <StudentsTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
        </MainCard>
      </Grid>
      <StudentForm 
        open={open}
        editMode={editMode}
        currentStudent={currentStudent}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        studentName={studentToDelete?.studentName || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
