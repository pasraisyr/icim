// API utility for SubjectsManagement
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Subject {
  id: number;
  name: string;
  status: 'active' | 'inactive';
}

export interface SubjectPayload {
  name: string;
  status: 'active' | 'inactive';
}

export async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/subjects/`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function createSubject(payload: SubjectPayload): Promise<Subject> {
  const res = await fetch(`${BASE_URL}/api/Academic/subjects/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create subject');
  return res.json();
}

export async function updateSubject(id: number, payload: SubjectPayload): Promise<Subject> {
  const res = await fetch(`${BASE_URL}/api/Academic/subjects/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update subject');
  return res.json();
}

export async function deleteSubject(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Academic/subjects/${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete subject');
}
