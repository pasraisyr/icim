import type { Subject } from '../SubjectsManagement/api';

// API utility for SubjectsManagement
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Class {
  id: number;
  name: string;
  subjects: Subject[];
  subject_ids?: number[];
  level: 'Primary' | 'Secondary' | 'Tuition';
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'active' | 'inactive';
}

export interface ClassPayload {
  name: string;
  subject_ids: number[];
  level: 'Primary' | 'Secondary' | 'Tuition';
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'active' | 'inactive';
}


export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/classes/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

export async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/subjects/`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function createClass(payload: ClassPayload): Promise<Class> {
  const res = await fetch(`${BASE_URL}/api/Academic/classes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create class');
  return res.json();
}

export async function updateClass(id: number, payload: ClassPayload): Promise<Class> {
  const res = await fetch(`${BASE_URL}/api/Academic/classes/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update class');
  return res.json();
}

export async function deleteClass(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Academic/classes/${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete class');
}

export type { Subject };