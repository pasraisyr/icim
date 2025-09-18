const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface Student {
  guardianPhone: string;
  id: number;
  guardianName: string;
  guardianIC: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  studentIC: string;
  address: string;
  level: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}


export interface StudentPayload {
  id?: number;
  guardianName: string;
  guardianIC: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  studentIC: string;
  address: string;
  level: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
  password: string;
  guardianPhone: string;
  class_method: string;
  total_fees: number;
  initial_payment: number;
  payment_reference?: string;
  payment_method?: string;
}

export async function fetchClasses(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(`${BASE_URL}/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

// Replace with real API calls
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/admin/clients/`);
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

export async function updateStudent(editingId: number, payload: StudentPayload): Promise<Student> {
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
  const res = await fetch(`${BASE_URL}/admin/client/delete/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete student');
}

export async function fetchStudentById(id: number): Promise<StudentPayload> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/client/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch student');
  return res.json();
}
