import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { fetchStudents, createStudent, updateStudent, deleteStudent, Student, StudentPayload, fetchStudentById } from './api';
import { StudentsTable, StudentForm, PageHeader, DeleteConfirmDialog } from './components';

const initialStudent: StudentPayload = {
  id: 0,
  guardianName: '',
  guardianIC: '',
  guardianPhone: '',
  phone_number: '',
  first_name: '',
  last_name: '',
  studentIC: '',
  address: '',
  level: '',
  status: 'active',
  enrollmentDate: '',
  password: 'Icim@2025',
  class_method: '',
  total_fees: 0,
  initial_payment: 0,
  payment_reference: '',
  payment_method: '',
};

import { fetchClasses } from './api';
import { StudentAllocation } from '../StudentAllocation/api';
import { fetchStudentAllocations } from "../StudentAllocation/api";


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
  const [studentAllocations, setStudentAllocations] = useState<StudentAllocation[]>([]);


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

  useEffect(() => {
    fetchStudentAllocations().then(setStudentAllocations);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentStudent(initialStudent);
    setEditingId(null);
  };

  const handleEdit = async (student: Student) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(student.id);

    try {
      // Fetch full student details from backend
      const fullStudent = await fetchStudentById(student.id);
      setCurrentStudent({
        ...fullStudent,
        password: 'Icim@2025', // Always set default password for edit
      });
    } catch (error) {
      setError('Failed to fetch student details');
      setCurrentStudent(initialStudent);
    }
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

  function getClassroomName(student_id: number) {
    const allocation = studentAllocations.find(a => a.student.id === student_id);
    return allocation ? allocation.classroom_id.name : 'N/A';
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Students List">
          <StudentsTable students={students} onEdit={handleEdit} onDelete={handleDelete} getClassroomName={getClassroomName} />
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
        studentName={studentToDelete?.first_name || studentToDelete?.last_name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}
