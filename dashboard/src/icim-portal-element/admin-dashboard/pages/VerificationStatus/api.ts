import axios from 'axios';
import { Class } from '../ClassesManagement/api';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export interface Student {
  id: number;
  guardianName: string;
  guardianIC: string;
  guardianPhone: string;
  studentName: string;
  studentIC: string;
  address: string;
  class_name: string;
  level: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
  submitted_at: string;
  payment_receipt: string;
  selected_payments?: string[];
}

export interface StudentPayload {
  id?: number;
  first_name: string;
  last_name: string;
  studentIC: string;
  phone_number: string;
  address: string;
  guardianName: string;
  guardianIC: string;
  guardianPhone: string;
  level: string;
  enrollmentDate: string;
  status : 'active' | 'inactive';
  password?: string;
  payment?: {
    payment_method: string;
    payment_reference: string;
    payment_receipt?: string | null;
    selected_payments?: string[];
    total_payment: number;
    class_package?: string | null;
  };
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

// Fetch all students (client + payment)
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/frontend/client_payment/list/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

// Create new student (client + payment)
export async function createStudent(payload: StudentPayload): Promise<Student> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/frontend/client_payment/input/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student');
  return res.json();
}

// Update student status to active
export async function handleVerify(id: number): Promise<Student> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/frontend/client_payment/edit/status/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ client_id: id }),
  });
  if (!res.ok) throw new Error('Failed to update student status');
  return res.json();
}

// View single student (client + payment)
export async function fetchStudent(id: number): Promise<Student> {
  const res = await fetch(`${BASE_URL}/frontend/client_payment/view/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch student');
  return res.json();
}

// Delete student (client + payment)
export async function deleteStudent(id: number): Promise<{ message: string }> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/frontend/client_payment/delete/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete student');
  return res.json();
}

// Update student (client only, not payment)
export async function updateStudent(id: number, payload: Partial<StudentPayload>): Promise<Student> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/frontend/client_payment/update/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ client_id: id, ...payload }),
  });
  if (!res.ok) throw new Error('Failed to update student');
  return res.json();
}