import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MainCard from "components/MainCard";
import { PaymentRecordTable, PaymentRecordForm, PageHeader } from "./components";


import {
  fetchPaymentRecords,
  createPaymentRecord,
  updatePaymentRecord,
  deletePaymentRecord,
  PaymentRecordData,
  PaymentRecordPayload,
} from "./api";
import { fetchStudents, Student } from "../StudentsManagement/api";
import { Class, fetchClasses } from "../ClassesManagement/api";
import { StudentAllocation } from "../StudentAllocation/api";
import { fetchStudentAllocations } from "../StudentAllocation/api";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

// Updated initial allocation to match PaymentRecordPayload
const initialAllocation: PaymentRecordPayload = {
  student_id: 0,
  class_package: null,
  payment_method: "",
  payment_reference: "",
  payment_receipt: "",
  selected_payments: [],
  total_payment: 0,
};

export default function PaymentRecord() {
  const [allocations, setAllocations] = useState<PaymentRecordData[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState<PaymentRecordPayload>(
    initialAllocation
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [classrooms, setClassrooms] = useState<Class[]>([]);
  const [studentAllocations, setStudentAllocations] = useState<StudentAllocation[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPaymentRecords()
      .then((allocationData) => {
        setAllocations(allocationData);
      })
      .catch(() => setError("Failed to fetch"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStudents().then(setStudents);
  }, []);

  useEffect(() => {
    fetchClasses().then(setClassrooms);
  }, []);

  useEffect(() => {
    fetchStudentAllocations().then(setStudentAllocations);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };

  const handleEdit = (allocation: PaymentRecordData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);

    let selected_payments = allocation.selected_payments;
    if (typeof selected_payments === 'string') {
      try {
        selected_payments = JSON.parse(selected_payments);
      } catch {
        selected_payments = [];
      }
    }

    setCurrentAllocation({
      id: allocation.id,
      student_id: allocation.student_id,
      class_package: allocation.class_package,
      payment_method: allocation.payment_method,
      payment_reference: allocation.payment_reference,
      payment_receipt: allocation.payment_receipt,
      selected_payments: selected_payments,
      total_payment: allocation.total_payment,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editMode && editingId !== null) {
        const updated = await updatePaymentRecord(currentAllocation);
        setAllocations(
          allocations.map((allocation) =>
            allocation.id === editingId ? updated : allocation
          )
        );
      } else {
        const created = await createPaymentRecord(currentAllocation);
        setAllocations([...allocations, created]);
      }
      handleClose();
    } catch (e) {
      setError("Failed to save payment record");
    }
  };

  const handleDelete = async (id: number) => {
    await deletePaymentRecord(id);
    setAllocations(allocations.filter((allocation) => allocation.id !== id));
  };

  const handleDeleteClick = (allocation: PaymentRecordData) => {
    const student = students.find(s => s.id === allocation.student_id);
    const name = student ? `${student.first_name} ${student.last_name}` : 'Unknown';
    setStudentToDelete({ id: allocation.id, name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete) {
      await deletePaymentRecord(studentToDelete.id);
      setAllocations(allocations.filter(a => a.id !== studentToDelete.id));
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };


  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleChange = (field: keyof PaymentRecordPayload, value: any) => {
    setCurrentAllocation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function getStudentInfo(student_id: number) {
    const student = students.find((s) => s.id === student_id);
    return student
      ? `${student.first_name} ${student.last_name} (${student.studentIC}) `
      : String(student_id);
  }

  function getClassroomName(student_id: number) {
    const allocation = studentAllocations.find(a => a.student.id === student_id);
    return allocation ? allocation.classroom_id.name : 'N/A';
  }

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Payment Records">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <PaymentRecordTable
              allocations={allocations}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              getStudentInfo={getStudentInfo}
              getClassroomName={getClassroomName}
              students={students}
            />
          )}
        </MainCard>
      </Grid>

      <PaymentRecordForm
        open={open}
        editMode={editMode}
        currentAllocation={currentAllocation}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
        students={students} // Pass students for dropdown/select
        classrooms={classrooms} // <-- Add this prop
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        studentName={studentToDelete?.name || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={async () => {
          if (studentToDelete) {
            await deletePaymentRecord(studentToDelete.id);
            setAllocations(allocations.filter(a => a.id !== studentToDelete.id));
            setDeleteDialogOpen(false);
            setStudentToDelete(null);
          }
        }}
      />
    </Grid>
  );
}
