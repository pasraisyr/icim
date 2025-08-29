// API utility for TeachersManagement
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface TeacherPayload {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
  role?: string; // Add this line
}

// Replace with real API calls
export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/teachers/`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}


export async function createTeacher(payload: TeacherPayload): Promise<Teacher> {
  const res = await fetch(`${BASE_URL}/api/Academic/teachers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create teacher');
  return res.json();
}

export async function updateTeacher(id: number, payload: TeacherPayload): Promise<Teacher> {
  const res = await fetch(`${BASE_URL}/api/Academic/teachers/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update teacher');
  return res.json();
}

export async function deleteTeacher(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Academic/teachers/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete teacher');
  return;
}
