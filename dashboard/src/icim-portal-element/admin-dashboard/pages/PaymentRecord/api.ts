// Utility to get subjects for a class
import { Student } from "../StudentsManagement/api";

const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface PaymentRecordData {
  id: number;
  studentName: string;
  studentIC: string;
  studentClass?: string;
  payment_method: string;
  payment_reference: string;
  payment_receipt: string; // URL or file path
  selected_payments: any[]; // Adjust type if needed
  total_payment: number;
  submitted_at: string;
}

export interface PaymentRecordPayload {
  studentName: string;
  studentIC: string;
  studentClass?: string;
  payment_method: string;
  payment_reference: string;
  payment_receipt?: File | string;
  selected_payments: any[];
  total_payment: number;
}


export async function fetchPaymentRecords(): Promise<PaymentRecordData[]> {
  const res = await fetch(`${BASE_URL}/admin/payments/`);
  if (!res.ok) throw new Error('Failed to fetch payment records');
  return res.json();
}


export async function createPaymentRecord(payload: PaymentRecordPayload): Promise<PaymentRecordData> {
  const formData = new FormData();
  formData.append('studentName', payload.studentName);
  formData.append('studentIC', payload.studentIC);
  formData.append('studentClass', payload.studentClass || '');
  formData.append('payment_method', payload.payment_method);
  formData.append('payment_reference', payload.payment_reference);
  formData.append('total_payment', String(payload.total_payment));
  formData.append('selected_payments', JSON.stringify(payload.selected_payments || []));
  // file upload
  if (payload.payment_receipt instanceof File) {
    formData.append('payment_receipt', payload.payment_receipt);
  }
  const res = await fetch(`${BASE_URL}/admin/payments/`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create payment record');
  return res.json();
}

export async function updatePaymentRecord(id: number, payload: PaymentRecordPayload): Promise<PaymentRecordData> {
  const res = await fetch(`${BASE_URL}/admin/payments/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update payment record');
  return res.json();
}

export async function deletePaymentRecord(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/payments/${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete payment record');
}

export async function fetchStudents(): Promise<Student[]> {
    const res = await fetch(`${BASE_URL}/admin/admin/students/`);
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
}



