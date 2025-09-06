import axios from 'axios';
// Verify student by setting status to 'active'
// Do not import Class here, just use fetchClasses return type inline

// API utility for StudentsManagement
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';


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
  submitted_at: string;
  payment_receipt: string;
  selected_payments?: string[]; // Array of selected payment keys
}


export interface StudentPayload {
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
}

export async function fetchClasses(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(`${BASE_URL}/admin/classes/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

// Replace with real API calls
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/admin/self-registrations/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function createStudent(payload: StudentPayload): Promise<Student> {
  const res = await fetch(`${BASE_URL}/admin/self-registration/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student');
  return res.json();
}

export async function updateStudent(id: number, payload: StudentPayload): Promise<Student> {
  const res = await fetch(`${BASE_URL}/admin/self-registration/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update student');
  return res.json();
}   

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/self-registration/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete student');
}

export const handleVerify = async (id: number) => {
  try {
    await axios.patch(`${BASE_URL}/admin/self-registration/${id}/`, { status: 'active' });
    // Optionally, return success or refresh data in parent component
    return true;
  } catch (error) {
    alert('Verification failed');
    return false;
  }
};