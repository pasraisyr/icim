// Utility to get subjects for a class
import { Student } from "../StudentsManagement/api";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export interface PaymentRecordData {
  id: number;
  student_id: number;
  class_package: number | null;
  class_package_name: string | null;
  payment_method: string;
  payment_reference: string;
  payment_receipt: string | null; // URL or null
  selected_payments: any[]; // Adjust type if needed
  total_payment: number;
  submitted_at: string;
}

export interface PaymentRecordPayload {
  id?: number;
  student_id: number;
  class_package?: number | null;
  payment_method: string;
  payment_reference: string;
  payment_receipt?: File | string | null;
  selected_payments: any[];
  total_payment: number;
}

// Fetch all payments
export async function fetchPaymentRecords(): Promise<PaymentRecordData[]> {
  const res = await fetch(`${BASE_URL}/admin/payments/`);
  if (!res.ok) throw new Error('Failed to fetch payment records');
  return res.json();
}

// Fetch single payment by id
export async function fetchPaymentRecord(id: number): Promise<PaymentRecordData> {
  const res = await fetch(`${BASE_URL}/admin/payment/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch payment record');
  return res.json();
}

// Create payment record
export async function createPaymentRecord(payload: PaymentRecordPayload): Promise<PaymentRecordData> {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('student_id', String(payload.student_id));
  if (payload.class_package) formData.append('class_package', String(payload.class_package));
  formData.append('payment_method', payload.payment_method);
  formData.append('payment_reference', payload.payment_reference);
  formData.append('total_payment', String(payload.total_payment));
  formData.append('selected_payments', JSON.stringify(payload.selected_payments || []));
  if (payload.payment_receipt instanceof File) {
    formData.append('payment_receipt', payload.payment_receipt);
  }
  const res = await fetch(`${BASE_URL}/admin/payment/input/`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to create payment record');
  return res.json();
}

// Update payment record
export async function updatePaymentRecord(payload: PaymentRecordPayload): Promise<PaymentRecordData> {
  const formData = new FormData();
  if (payload.id) formData.append('id', String(payload.id));
  formData.append('student_id', String(payload.student_id));
  if (payload.class_package) formData.append('class_package', String(payload.class_package));
  formData.append('payment_method', payload.payment_method);
  formData.append('payment_reference', payload.payment_reference);
  formData.append('total_payment', String(payload.total_payment));
  formData.append('selected_payments', JSON.stringify(payload.selected_payments || []));
  if (payload.payment_receipt instanceof File) {
    formData.append('payment_receipt', payload.payment_receipt);
  }
  const res = await fetch(`${BASE_URL}/admin/payment/edit/`, {
    method: 'PUT',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to update payment record');
  return res.json();
}

// Delete payment record
export async function deletePaymentRecord(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/payment/delete/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete payment record');
}

export async function fetchStudents(): Promise<Student[]> {
    const res = await fetch(`${BASE_URL}/admin/admin/students/`);
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
}



