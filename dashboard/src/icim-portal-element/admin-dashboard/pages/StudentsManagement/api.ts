// Do not import Class here, just use fetchClasses return type inline

import { co } from "@fullcalendar/core/internal-common";

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
  level: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}


export interface StudentPayload {
  id: number;
  guardianName: string;
  guardianIC: string;
  guardianPhone: string;
  studentName: string;
  studentIC: string;
  address: string;
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
  const res = await fetch(`${BASE_URL}/admin/students/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function createStudent(payload: StudentPayload): Promise<Student> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/client/input/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student');
  return res.json();
}

export async function updateStudent(payload: StudentPayload): Promise<Student> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/client/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update student');
  return res.json();
}   

export async function deleteStudent(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/client/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete student');
}
