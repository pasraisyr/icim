import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { fetchStudents, createStudent, updateStudent, deleteStudent, Student, StudentPayload } from './api';
import { StudentsTable, StudentForm, PageHeader, DeleteConfirmDialog } from './components';
import ConfirmationDialog from './components/ConfirmationDialog';
import { handleVerify } from './api';

const initialStudent: StudentPayload = {
  first_name: '',
  last_name: '',
  studentIC: '',
  phone_number: '',
  address: '',
  guardianName: '',
  guardianIC: '',
  guardianPhone: '',
  level: '',
  enrollmentDate: '',
  password: '',
  status: 'inactive',
  payment: {
    payment_method: '',
    payment_reference: '',
    payment_receipt: null,
    selected_payments: [],
    total_payment: 0,
    class_package: null
  }
};

import { fetchClasses } from './api';

function mapClientPaymentToStudent(item: any): Student {
  const client = item.client;
  const payment = item.payment || {};
  return {
    id: client.id,
    guardianName: client.guardianName,
    guardianIC: client.guardianIC,
    guardianPhone: client.guardianPhone,
    studentName: `${client.first_name} ${client.last_name}`,
    studentIC: client.studentIC,
    address: client.address,
    class_name: payment.class_package_name || '',
    level: client.level,
    status: client.status,
    enrollmentDate: client.enrollmentDate,
    submitted_at: payment.submitted_at || '',
    payment_receipt: payment.payment_receipt || '',
    selected_payments: payment.selected_payments || [],
  };
}

const VerificationStatus = () => {
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

  // For verification confirmation dialog
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [studentToVerify, setStudentToVerify] = useState<Student | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchStudents(), fetchClasses()])
      .then(([studentData, classData]) => {
        // studentData = [{client, payment}, ...]
        setStudents(studentData.map(mapClientPaymentToStudent));
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
      first_name: student.studentName.split(' ')[0] || '',
      last_name: student.studentName.split(' ').slice(1).join(' ') || '',
      studentIC: student.studentIC,
      phone_number: student.guardianPhone,
      address: student.address,
      guardianName: student.guardianName,
      guardianIC: student.guardianIC,
      guardianPhone: student.guardianPhone,
      level: student.level,
      enrollmentDate: student.enrollmentDate,
      password: '',
      status: student.status,
      payment: {
        payment_method: '',
        payment_reference: '',
        payment_receipt: student.payment_receipt || null,
        selected_payments: student.selected_payments || [],
        total_payment: 0,
        class_package: null
      }
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
      // Always map backend response to Student interface
      setStudents(students.map(s => (s.id === editingId ? mapClientPaymentToStudent(updated) : s)));
    } else {
      const created = await createStudent(currentStudent);
      setStudents([...students, mapClientPaymentToStudent(created)]);
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

  // Called from StudentsTable when Verify button is clicked
  const handleVerifyRequest = (id: number) => {
    const student = students.find(s => s.id === id) || null;
    setStudentToVerify(student);
    setVerifyDialogOpen(true);
  };

  // Called when user confirms verification
  const handleConfirmVerify = async () => {
    if (studentToVerify) {
      const success = await handleVerify(studentToVerify.id);
      if (success) {
        setStudents(students.map(s =>
          s.id === studentToVerify.id ? { ...s, status: 'active' } : s
        ));
      }
      setVerifyDialogOpen(false);
      setStudentToVerify(null);
    }
  };

  const handleCancelVerify = () => {
    setVerifyDialogOpen(false);
    setStudentToVerify(null);
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
          <StudentsTable students={students} onEdit={handleEdit} onDelete={handleDelete} onVerify={handleVerifyRequest} />
        </MainCard>
      </Grid>
      <StudentForm 
        open={open}
        editMode={editMode}
        currentStudent={currentStudent}
        availableClasses={availableClasses}
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
      <ConfirmationDialog
        open={verifyDialogOpen}
        title="Verify Student"
        message={`Are you sure you want to verify ${studentToVerify?.studentName || 'this student'}? This will set their status to active.`}
        onConfirm={handleConfirmVerify}
        onCancel={handleCancelVerify}
      />
    </Grid>
  );
}

export default VerificationStatus;