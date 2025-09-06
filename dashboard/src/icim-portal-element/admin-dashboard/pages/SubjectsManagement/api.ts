// API utility for SubjectsManagement
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface Subject {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  updated_at: string;
}

export interface SubjectPayload {
  id: number;
  name: string;
  status: 'active' | 'inactive';
}

export async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch(`${BASE_URL}/admin/subject/`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function createSubject(payload: SubjectPayload): Promise<Subject> {
  const token = localStorage.getItem('token'); // Or get from context/store
  const res = await fetch(`${BASE_URL}/admin/subject/input/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create subject');
  return res.json();
}

export async function updateSubject(payload: SubjectPayload): Promise<Subject> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/subject/edit/`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload), 
  });
  if (!res.ok) throw new Error('Failed to edit subject');
  return res.json();
}

export async function deleteSubject(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/subject/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id }) // send id in body
  });
  if (!res.ok) throw new Error('Failed to delete subject');
}
