// API utility for TeachersManagement
const BASE_URL = import.meta.env.VITE_APP_API_URL ;

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  status: 'active' | 'inactive';
  joinDate: string;
  position: string;
}

export interface TeacherPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: 'active' | 'inactive';
  joinDate: string;
  password: string;
  position: string; // <-- Added
}

// Replace with real API calls
export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/admin/staffs/`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}


export async function createTeacher(payload: TeacherPayload): Promise<Teacher> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/staff/input/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create teacher');
  return res.json();
}

export async function updateTeacher( payload: TeacherPayload): Promise<Teacher> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/staff/edit/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update teacher');
  return res.json();
}

export async function deleteTeacher(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/staff/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id }) // send id in body
  });
  if (!res.ok) throw new Error('Failed to delete teacher');
  return;
}
