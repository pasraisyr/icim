import type { Subject } from '../SubjectsManagement/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Class {
  id: number;
  name: string;
  subjects: Subject[];
  subject_ids?: number[];
  level: 'Primary' | 'Secondary' | 'Tuition';
  scheduleDate: string;  // Changed from scheduleDay
  startTime: string;
  endTime: string;
  price: number;
  statuse: 'active' | 'inactive';  // Changed from status to match backend
}

export interface ClassPayload {
  name: string;
  subject_ids: number[];
  level: 'Primary' | 'Secondary' | 'Tuition';
  scheduleDate: string;  // Changed from scheduleDay
  startTime: string;
  endTime: string;
  price: number;
  statuse: 'active' | 'inactive';  // Changed from status to match backend
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/api/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

export async function fetchClass(id: number): Promise<Class> {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${BASE_URL}/api/admin/classroom/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch class');
  return res.json();
}

export async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch(`${BASE_URL}/api/admin/subject/`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function createClass(payload: ClassPayload): Promise<Class> {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${BASE_URL}/api/admin/classrooms/input/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create class');
  return res.json();
}

export async function updateClass(id: number, payload: Partial<ClassPayload> & { id: number }): Promise<Class> {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${BASE_URL}/api/admin/classrooms/edit/`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...payload, id }),
  });
  if (!res.ok) throw new Error('Failed to update class');
  return res.json();
}

export async function deleteClass(id: number): Promise<void> {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${BASE_URL}/api/admin/classrooms/delete/`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete class');
}

export type { Subject };