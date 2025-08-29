// Utility to get subjects for a class
import type { Subject } from '../SubjectsManagement/api';
import type { Class } from '../ClassesManagement/api';
import type { Teacher } from '../TeachersManagement/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


export interface TeacherAllocationData {
  id: number;
  teacher: Teacher;
  class_obj: Class;
  subjects: Subject[];
}

export interface TeacherAllocationPayload {
  teacher_id: number;
  class_obj_id: number;
  subject_ids: number[];
}



export async function fetchTeacherAllocations(): Promise<TeacherAllocationData[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/teacher-allocations/`);
  if (!res.ok) throw new Error('Failed to fetch teacher allocations');
  return res.json();
}

export async function createTeacherAllocation(payload: TeacherAllocationPayload): Promise<TeacherAllocationData> {
  const res = await fetch(`${BASE_URL}/api/Academic/teacher-allocations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create teacher allocation');
  return res.json();
}

export async function updateTeacherAllocation(id: number, payload: TeacherAllocationPayload): Promise<TeacherAllocationData> {
  const res = await fetch(`${BASE_URL}/api/Academic/teacher-allocations/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update teacher allocation');
  return res.json();
}

export async function deleteTeacherAllocation(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Academic/teacher-allocations/${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete teacher allocation');
}

export async function fetchSubjects(): Promise<Subject[]> {
    const res = await fetch(`${BASE_URL}/api/Academic/subjects/`);
    if (!res.ok) throw new Error('Failed to fetch subjects');
    return res.json();
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/teachers/`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/api/Academic/classes/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

export type { Teacher, Class, Subject };